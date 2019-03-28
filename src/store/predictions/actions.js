/* eslint-disable no-tabs */
import { initialPredictionsState } from './index'
import Prediction from '@/domain/Prediction'
import Forecast from '@/domain/Forecast'
import EthUtils from '@/utils/EthUtils'
import router from '@/router'

export default {
  async resetState ({ commit }) {
    commit('resetState', initialPredictionsState())
  },

  async getPredictionsList ({ commit, state }, page) {
    commit('setLoading', true, { root: true })
    const timestamp = new Date().getTime()

    commit('setPredictions', {
      items: [],
      totalPages: 1,
      timestamp: timestamp
    })

    try {
      const contracts = await EthUtils.getContracts(process.env.CONTRACT_TYPES.PREDICTIONS)
      const itemsPerPage = process.env.PREDICTIONS_ITEMS_PER_PAGE
      const startItem = page * itemsPerPage - itemsPerPage + 1
      let predictionsCounter = 0

      const predictionsLengths = []

      for (const contract of contracts) {
        const predictionsLength = await contract.methods.totalPredictions().call()

        predictionsLengths.push(parseInt(predictionsLength))
      }

      const totalPredictions = predictionsLengths.reduce((total, current) => total + current)
      const totalPages = Math.ceil(totalPredictions / itemsPerPage)

      let totalItems = 0

      if (page === totalPages) {
        totalItems = totalPredictions - itemsPerPage * (totalPages - 1)
      } else {
        totalItems = itemsPerPage
      }

      commit('setPredictionsPagesAndItems', { totalPages, totalItems })

      for (let contractIndex = 0; contractIndex < contracts.length; contractIndex++) {
        const contract = contracts[contractIndex]
        const predictionsLength = predictionsLengths[contractIndex]

        // Iterating through predictions in a conctract
        for (let i = predictionsLength; i > 0 && state.predictions.items.length < itemsPerPage; i--) {
          predictionsCounter++

          if (predictionsCounter < startItem) {
            continue
          }

          const prediction = await Prediction.createItem(contract, i)
          commit('addPredictionToList', prediction)

          if (predictionsCounter === startItem) {
            commit('setLoading', false, { root: true })
          }
        }
      }
      commit('setLoading', false, { root: true })
    } catch (ex) {
      console.error(ex)
      commit('setLoading', false, { root: true })
    }
  },

  async getPrediction ({ commit, dispatch }, payload) {
    commit('setPrediction', {
      item: {},
      predictionStatistics: {}
    })
    commit('setLoading', true, { root: true })

    try {
      const prediction = await Prediction.create(payload.address, payload.id)

      commit('setPrediction', {
        item: prediction,
        predictionStatistics: {}
      })

      if (prediction.status.toUpperCase() === 'RESOLVED') {
        dispatch('getAmountPerOutcomeStatistics', prediction)
      }

      if (prediction.status.toUpperCase() === 'NOTSET') {
        router.push({
          name: 'NotFound',
          params: { '0': 'notfound' }
        })
      }

      commit('setLoading', false, { root: true })
    } catch (ex) {
      console.error(ex)
      commit('setLoading', false, { root: true })
    }
  },

  async getAmountPerOutcomeStatistics ({ commit }, prediction) {
    commit('setAmountPerOutcomeStatistics', {})
    commit('setAmountPerOutcomeStatisticsLoading', true)

    const rows = []

    for (let outcome of prediction.outcomes) {
      const percentage = (100 * outcome.totalTokens) / (prediction.poolSize - prediction.initialTokens)
      rows.push([outcome.id, outcome.name, outcome.index, percentage])
    }

    commit('setAmountPerOutcomeStatistics', { rows })
    commit('setAmountPerOutcomeStatisticsLoading', false)
  },

  async getUserForecasts ({ commit, state, rootState }, page) {
    const timestamp = new Date().getTime()

    commit('setUserForecasts', {
      items: [],
      totalPages: 0,
      timestamp: timestamp
    })

    commit('setLoading', true, { root: true })

    try {
      const contracts = await EthUtils.getContracts(process.env.CONTRACT_TYPES.PREDICTIONS)
      const itemsPerPage = process.env.FORECASTS_ITEMS_PER_PAGE
      const startItem = page * itemsPerPage - itemsPerPage + 1

      const forecastsLengths = []

      for (const contract of contracts) {
        const forecastsLength = await contract.methods.getMyForecastsLength().call({
          from: rootState.user.userWeb3.coinbase
        })

        forecastsLengths.push(parseInt(forecastsLength))
      }

      const totalForecasts = forecastsLengths.reduce((total, current) => total + current)
      const totalPages = Math.ceil(totalForecasts / itemsPerPage)

      let totalItems = 0

      if (page === totalPages) {
        totalItems = totalForecasts - itemsPerPage * (totalPages - 1)
      } else {
        totalItems = itemsPerPage
      }

      commit('setForecastsPagesAndItems', { totalPages, totalItems })

      let iterator = 0
      for (let contractIndex = 0; contractIndex < contracts.length; contractIndex++) {
        const contract = contracts[contractIndex]
        const forecastsCount = forecastsLengths[contractIndex]

        for (let i = forecastsCount - 1; i >= 0 && state.userForecasts.items.length < itemsPerPage; i--) {
          // Thread safety
          if (timestamp !== state.userForecasts.timestamp) return

          iterator++

          if (iterator < startItem) continue

          const id = await contract.methods.myForecasts(rootState.user.userWeb3.coinbase, i).call()
          const forecast = await Forecast.createItem(contract, id)

          commit('addForecast', forecast)
          if (iterator === startItem) {
            commit('setLoading', false, { root: true })
          }
        }
      }
      commit('setLoading', false, { root: true })
    } catch (ex) {
      console.error(ex)
      commit('setLoading', false, { root: true })
    }
  },

  async addForecast ({ commit, rootState }, payload) {
    commit('setTransactionHash', '')
    commit('setTransactionError', false)
    commit('setLoading', true, { root: true })

    try {
      const TokenInstance = await EthUtils.getContract(process.env.CONTRACTS_ADDRESSES.TOKEN)

      const paymentValue = EthUtils.toWei(payload.amount.toString())
      const predictionIdHex = EthUtils.getHex(payload.predictionId)
      let outcomeHex = EthUtils.getHex(payload.outcome)
      const bytes = outcomeHex + predictionIdHex.replace('0x', '')

      const gasLimit = await TokenInstance.methods
        .approveAndCall(payload.address, paymentValue, bytes)
        .estimateGas({ from: rootState.user.userWeb3.coinbase })

      TokenInstance.methods
        .approveAndCall(payload.address, paymentValue, bytes)
        .send({
          gas: gasLimit,
          from: rootState.user.userWeb3.coinbase
        })
        .on('error', () => {
          commit('setLoading', false, { root: true })
          commit('setTransactionError', true)
        })
        .once('transactionHash', async txId => {
          commit('setLoading', false, { root: true })
          commit('setTransactionHash', txId)
        })
    } catch (e) {
      console.error(e)
      commit('setLoading', false, { root: true })
      commit('setTransactionError', true)
    }
  },

  async getUserForecast ({ commit, dispatch }, payload) {
    commit('setUserForecast', {})
    commit('setLoading', true, { root: true })

    try {
      const forecast = await Forecast.create(payload.address, payload.id)
      commit('setUserForecast', { item: forecast })

      const prediction = await forecast.getPrediction()

      if (prediction.status.toUpperCase() === 'RESOLVED') {
        dispatch('getAmountPerOutcomeStatistics', prediction)
      }

      if (prediction.status.toUpperCase() === 'NOTSET') {
        router.push({
          name: 'NotFound',
          params: { '0': 'notfound' }
        })
      }

      commit('setLoading', false, { root: true })
    } catch (e) {
      console.error(e)
      commit('setLoading', false, { root: true })
    }
  },

  async payoutWon ({ commit, rootState }, payload) {
    commit('setTransactionHash', '')
    commit('setTransactionError', false)

    try {
      const MarketInstance = await EthUtils.getContract(payload.address)
      const forecastIdHex = EthUtils.getHex(parseInt(payload.id))
      const predictionIdHex = EthUtils.getHex(parseInt(payload.predictionId))

      const gasLimit = await MarketInstance.methods
        .payout(predictionIdHex, forecastIdHex)
        .estimateGas({ from: rootState.user.userWeb3.coinbase })

      MarketInstance.methods
        .payout(predictionIdHex, forecastIdHex)
        .send({
          gas: gasLimit,
          from: rootState.user.userWeb3.coinbase
        })
        .on('error', e => {
          console.error(e)
          commit('setTransactionError', true)
        })
        .once('transactionHash', async txId => {
          commit('setTransactionHash', txId)
        })
    } catch (e) {
      console.error(e)
    }
  },

  async payoutRefund ({ commit, rootState }, payload) {
    commit('setTransactionHash', '')
    commit('setTransactionError', false)

    try {
      const MarketInstance = await EthUtils.getContract(payload.address)
      const forecastIdHex = EthUtils.getHex(parseInt(payload.id))
      const predictionIdHex = EthUtils.getHex(parseInt(payload.predictionId))

      const gasLimit = await MarketInstance.methods
        .refund(forecastIdHex, predictionIdHex)
        .estimateGas({ from: rootState.user.userWeb3.coinbase })

      MarketInstance.methods
        .refund(forecastIdHex, predictionIdHex)
        .send({
          gas: gasLimit,
          from: rootState.user.userWeb3.coinbase
        })
        .on('error', e => {
          console.error(e)
          commit('setTransactionError', true)
        })
        .once('transactionHash', async txId => {
          commit('setTransactionHash', txId)
        })
    } catch (e) {
      console.error(e)
    }
  }
}
