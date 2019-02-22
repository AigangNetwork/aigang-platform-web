/* eslint-disable no-tabs */
import { initialPredictionsState } from './index'
import axios from 'axios'
import Prediction from '@/domain/Prediction'
import Forecast from '@/domain/Forecast'
import EthUtils from '@/utils/EthUtils'

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

      // Iterating through contracts
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

  async getPrediction ({ commit }, payload) {
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

      commit('setLoading', false, { root: true })
    } catch (ex) {
      console.error(ex)
      commit('setLoading', false, { root: true })
    }
  },

  // TODO
  async getPredictionStatistics ({ commit, dispatch }, predictionId) {
    dispatch('getCountPerOutcomePredictionStatistics', predictionId)
    dispatch('getAmountPerOutcomePredictionStatistics', predictionId)
  },

  // TODO
  async getCountPerOutcomePredictionStatistics ({ commit }, predictionId) {
    commit('setCountPerOutcomeStatistics', {})
    commit('setCountPerOutcomeStatisticsLoading', true)

    try {
      const response = await axios.get(`/predictions/stats/prediction/${predictionId}/CountPerOutcome`)

      if (response.data) {
        commit('setCountPerOutcomeStatistics', response.data)
      }

      commit('setCountPerOutcomeStatisticsLoading', false)
    } catch (ex) {
      commit('setCountPerOutcomeStatisticsLoading', false)
    }
  },

  // TODO
  async getAmountPerOutcomePredictionStatistics ({ commit }, predictionId) {
    commit('setAmountPerOutcomeStatistics', {})
    commit('setAmountPerOutcomeStatisticsLoading', true)

    try {
      const response = await axios.get(`/predictions/stats/prediction/${predictionId}/AmountPerOutcome`)

      if (response.data) {
        commit('setAmountPerOutcomeStatistics', response.data)
      }

      commit('setAmountPerOutcomeStatisticsLoading', false)
    } catch (ex) {
      commit('setAmountPerOutcomeStatisticsLoading', false)
    }
  },

  // TODO
  async getPredictionStatisticsForForecast ({ commit, dispatch }, forecastId) {
    dispatch('getCountPerOutcomeForecastStatistics', forecastId)
    dispatch('getAmountPerOutcomeForecastStatistics', forecastId)
  },

  //  TODO
  async getCountPerOutcomeForecastStatistics ({ commit }, forecastId) {
    commit('setCountPerOutcomeStatistics', {})
    commit('setCountPerOutcomeStatisticsLoading', true)

    try {
      const response = await axios.get(`/predictions/stats/forecast/${forecastId}/CountPerOutcome`)

      if (response.data) {
        commit('setCountPerOutcomeStatistics', response.data)
      }

      commit('setCountPerOutcomeStatisticsLoading', false)
    } catch (ex) {
      commit('setCountPerOutcomeStatisticsLoading', false)
    }
  },

  // TODO
  async getAmountPerOutcomeForecastStatistics ({ commit }, forecastId) {
    commit('setAmountPerOutcomeStatistics', {})
    commit('setAmountPerOutcomeStatisticsLoading', true)

    try {
      const response = await axios.get(`/predictions/stats/forecast/${forecastId}/AmountPerOutcome`)

      if (response.data) {
        commit('setAmountPerOutcomeStatistics', response.data)
      }

      commit('setAmountPerOutcomeStatisticsLoading', false)
    } catch (ex) {
      commit('setAmountPerOutcomeStatisticsLoading', false)
    }
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

  async getUserForecast ({ commit }, payload) {
    // commit('setUserForecast', {})
    commit('setLoading', true, { root: true })

    try {
      const forecast = await Forecast.create(payload.address, payload.id)
      const predictionStatus = forecast.predictionStatus.toUpperCase()
      const forecastStatus = forecast.status.toUpperCase()

      // TODO
      if (
        (forecastStatus !== 'NOTSET' &&
					forecastStatus !== 'DRAFT' &&
					forecastStatus !== 'PENDINGPAYMENT' &&
					forecastStatus !== 'AVAILABLEREFUND' &&
					predictionStatus !== 'CANCELED') ||
				predictionStatus === 'RESOLVED'
      ) {
        // dispatch('getPredictionStatisticsForForecast', forecastId)
      }

      commit('setUserForecast', { item: forecast })
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
