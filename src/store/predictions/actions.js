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
    commit('setPredictions', {
      items: [],
      totalPages: 1
    })

    try {
      const contracts = await EthUtils.getContracts(process.env.CONTRACT_TYPES.PREDICTIONS)
      const itemsPerPage = process.env.PREDICTIONS_ITEMS_PER_PAGE
      const startItem = page * itemsPerPage - itemsPerPage + 1
      let totalPredictions = 0
      let predictionsCounter = 0

      for (const contract of contracts) {
        const predictionsLength = parseInt(await contract.methods.totalPredictions().call())
        totalPredictions += predictionsLength

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

      commit('setPredictionsTotalPages', Math.ceil(totalPredictions / itemsPerPage))
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
    commit('setUserForecasts', {
      items: [],
      totalPages: 0
    })
    commit('setLoading', true, { root: true })
    try {
      const contracts = await EthUtils.getContracts(process.env.CONTRACT_TYPES.PREDICTIONS)
      let totalForecasts = 0
      const itemsPerPage = process.env.FORECASTS_ITEMS_PER_PAGE
      const startItem = page * itemsPerPage - itemsPerPage + 1

      let iterator = 0
      for (const contract of contracts) {
        const forecastsCount = parseInt(
          await contract.methods.getMyForecastsLength().call({
            from: rootState.user.userWeb3.coinbase
          })
        )
        totalForecasts += forecastsCount

        for (let i = forecastsCount - 1; i >= 0 && state.userForecasts.items.length < itemsPerPage; i--) {
          iterator++

          if (iterator < startItem) {
            continue
          }

          const id = await contract.methods.myForecasts(rootState.user.userWeb3.coinbase, i).call()
          const forecast = await Forecast.createItem(contract, id)

          commit('addForecast', forecast)
          if (iterator === startItem) {
            commit('setLoading', false, { root: true })
          }
        }
        commit('setUserForecastsTotalPages', Math.ceil(totalForecasts / itemsPerPage))
      }
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

      const paymentValue = window.web3.utils.toWei(payload.amount.toString())
      const predictionIdHex = EthUtils.getHex(payload.predictionId)
      let outcomeHex = EthUtils.getHex(payload.outcome)
      const bytes = outcomeHex + predictionIdHex.replace('0x', '')

      TokenInstance.methods
        .approveAndCall(payload.address, paymentValue, bytes)
        .send({
          gas: process.env.GAS.ADD_FORECAST,
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

      MarketInstance.methods
        .payout(predictionIdHex, forecastIdHex)
        .send({
          gas: process.env.GAS.FORECAST_PAYOUT,
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

      MarketInstance.methods
        .refund(forecastIdHex, predictionIdHex)
        .send({
          gas: process.env.GAS.FORECAST_PAYOUT,
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
