/* eslint-disable no-tabs */
import { initialPredictionsState } from './index'
import axios from 'axios'
import getAbi from '@/utils/contract/getAbi'
import getContracts from '@/utils/contract/getContracts'
import Prediction from '@/domain/Prediction'
import Forecast from '@/domain/Forecast'
const web3 = window.web3

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
      const contracts = await getContracts(process.env.CONTRACT_TYPES.PREDICTIONS)
      const itemsPerPage = process.env.PREDICTIONS_ITEMS_PER_PAGE
      const startItem = page * itemsPerPage - itemsPerPage + 1
      let totalPredictions = 0
      let predictionsCounter = 0

      // Iterating through contracts
      for (let index = contracts.length - 1; index >= 0; index--) {
        const contract = contracts[index]
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
      const abi = await getAbi(payload.address)
      const contract = new window.web3.eth.Contract(abi, payload.address)
      const prediction = await Prediction.create(contract, payload.id)

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
      const contracts = await getContracts(process.env.CONTRACT_TYPES.PREDICTIONS)
      let totalForecasts = 0
      const itemsPerPage = process.env.FORECASTS_ITEMS_PER_PAGE
      const startItem = page * itemsPerPage - itemsPerPage + 1

      let iterator = 0
      for (let contractIndex = contracts.length - 1; contractIndex >= 0; contractIndex--) {
        const contract = contracts[contractIndex]
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
      const tokenAddress = process.env.CONTRACTS_ADDRESSES.TOKEN
      const tokenAbi = await getAbi(tokenAddress)
      const TokenInstance = new window.web3.eth.Contract(tokenAbi, tokenAddress)

      const paymentValue = window.web3.utils.toWei(payload.amount.toString())
      const predictionIdHex = getHex(payload.predictionId)
      let outcomeHex = getHex(payload.outcome)
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

  async deleteForecast ({ commit }, id) {
    try {
      await axios.delete(`/predictions/forecast/${id}`)
    } catch (err) {}
  },

  async getUserForecast ({ commit }, payload) {
    // commit('setUserForecast', {})
    commit('setLoading', true, { root: true })

    try {
      const abi = await getAbi(payload.address)
      const contract = new window.web3.eth.Contract(abi, payload.address)
      const forecast = await Forecast.create(contract, payload.id)
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

  async payoutWon ({ commit, dispatch, rootState }, payload) {
    commit('setTransactionHash', '')
    commit('setTransactionError', false)

    try {
      const abi = await getAbi(payload.address)
      const MarketInstance = new window.web3.eth.Contract(abi, payload.address)

      MarketInstance.methods
        .payout(getHex(parseInt(payload.predictionId)), getHex(parseInt(payload.id)))
        .send({
          gas: process.env.GAS.FORECAST_PAYOUT,
          from: rootState.user.userWeb3.coinbase
        })
        .on('error', () => {
          commit('setTransactionError', true)
        })
        .once('transactionHash', async txId => {
          commit('setTransactionHash', txId)
        })
    } catch (e) {
      console.error(e)
    }
  },

  async payoutRefund ({ commit, dispatch, rootState }, payload) {
    commit('setTransactionHash', '')
    commit('setTransactionError', false)
    const response = await axios.get(`/contracts/${payload.marketAddress}`)

    if (response.data) {
      const web3 = window.web3
      const MarketInstance = new web3.eth.Contract(JSON.parse(response.data.abi), payload.marketAddress)
      const predictionIdHex = web3.utils.fromAscii(payload.predictionId)
      const forecastIdHex = web3.utils.fromAscii(payload.id)

      MarketInstance.methods
        .refund(predictionIdHex, forecastIdHex)
        .send({
          gas: process.env.GAS.FORECAST_PAYOUT,
          from: rootState.user.userWeb3.coinbase
        })
        .on('error', () => {
          commit('setTransactionError', true)
        })
        .once('transactionHash', async txId => {
          try {
            const request = {
              forecastId: payload.id,
              predictionId: payload.predictionId,
              txId
            }

            await axios.post('/predictions/transaction/forecastRefund', request)

            commit('setTransactionHash', txId)
            dispatch('getUserForecast', payload.id)
          } catch (ex) {}
        })
    }
  }
}

const getHex = x => {
  var result = web3.toHex(x)

  if (result.length % 2 === 1) {
    // bug https://github.com/ethereum/web3.js/issues/873
    result = result.replace('0x', '0x0')
  }

  return result
}
