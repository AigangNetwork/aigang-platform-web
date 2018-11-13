import axios from 'axios'

export default {
  async getPredictionsList ({ commit }, page) {
    commit('setLoading', true, {
      root: true
    })

    try {
      const response = await axios.get('/predictions/list?page=' + page)
      if (response.data) {
        commit('setPredictions', response.data)
      }

      commit('setLoading', false, {
        root: true
      })
    } catch (ex) {
      commit('setLoading', false, {
        root: true
      })
    }
  },

  async getPrediction ({ commit, dispatch }, id) {
    commit('setLoading', true, {
      root: true
    })

    try {
      const response = await axios.get('/predictions/prediction/' + id)
      if (response.data) {
        commit('setPrediction', response.data)
        const prediction = response.data.item

        if (prediction && prediction.status.toUpperCase() === 'RESOLVED') {
          dispatch('getPredictionStatistics', id)
        }
      }

      commit('setLoading', false, {
        root: true
      })
    } catch (ex) {
      commit('setLoading', false, {
        root: true
      })
    }
  },

  async getPredictionStatistics ({ commit, dispatch }, predictionId) {
    dispatch('getCountPerOutcomePredictionStatistics', predictionId)
    dispatch('getAmountPerOutcomePredictionStatistics', predictionId)
  },

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

  async getPredictionStatisticsForForecast ({ commit, dispatch }, forecastId) {
    dispatch('getCountPerOutcomeForecastStatistics', forecastId)
    dispatch('getAmountPerOutcomeForecastStatistics', forecastId)
  },

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

  async getUserForecasts ({ commit }, payload) {
    commit('setLoading', true, {
      root: true
    })

    try {
      const response = await axios.get(`/predictions/myforecasts?page=${payload.page}&status=${payload.filter.status}`)

      if (response.data) {
        commit('setUserForecasts', response.data)
      }

      commit('setLoading', false, {
        root: true
      })
    } catch (ex) {
      commit('setLoading', false, {
        root: true
      })
    }
  },

  async addForecast ({ commit, rootState, state }, payload) {
    commit('setTransactionHash', '')
    commit('setTransactionError', false)

    commit('setLoading', true, {
      root: true
    })

    try {
      const response = await axios.post('/predictions/forecast', payload)

      if (response.data) {
        const web3 = rootState.user.userWeb3.web3()
        const TokenInstance = new web3.eth.Contract(process.env.CONTRACT_INFO.ABI, process.env.CONTRACT_INFO.ADDRESS)
        const paymentValue = web3.utils.toWei(payload.amount.toString())
        const predictionIdHex = web3.utils.fromAscii(payload.predictionId)

        let outcomeHex = Number(payload.outcome).toString(16)
        if (outcomeHex.length === 1) {
          outcomeHex = '0' + outcomeHex
        }

        const forecastIdHex = web3.utils.fromAscii(response.data.forecast.id)

        commit('setLoading', false, {
          root: true
        })

        const bytes = (predictionIdHex + forecastIdHex + outcomeHex).replace(/0x/g, '')

        TokenInstance.methods
          .approveAndCall(state.prediction.marketAddress, paymentValue, '0x' + bytes)
          .send({
            gas: process.env.GAS.ADD_FORECAST,
            from: rootState.user.userWeb3.coinbase
          })
          .on('error', () => {
            commit('setTransactionError', true)
          })
          .once('transactionHash', async txId => {
            try {
              const payload = {
                forecastId: response.data.forecast.id,
                txId
              }

              await axios.post('/predictions/transaction/addForecast', payload)

              commit('setTransactionHash', txId)
            } catch (ex) {}
          })
      }
    } catch (ex) {}
  },

  async payForecast ({ commit, dispatch, rootState, state }, payload) {
    commit('setTransactionHash', '')
    commit('setTransactionError', false)

    commit('setLoading', true, {
      root: true
    })

    try {
      const web3 = rootState.user.userWeb3.web3()
      const TokenInstance = new web3.eth.Contract(process.env.CONTRACT_INFO.ABI, process.env.CONTRACT_INFO.ADDRESS)
      const paymentValue = web3.utils.toWei(payload.amount.toString())
      const predictionIdHex = web3.utils.fromAscii(payload.predictionId)

      let outcomeHex = Number(payload.outcome).toString(16)
      if (outcomeHex.length === 1) {
        outcomeHex = '0' + outcomeHex
      }

      const forecastIdHex = web3.utils.fromAscii(payload.forecastId)

      commit('setLoading', false, {
        root: true
      })

      const bytes = (predictionIdHex + forecastIdHex + outcomeHex).replace(/0x/g, '')

      TokenInstance.methods
        .approveAndCall(state.prediction.marketAddress, paymentValue, '0x' + bytes)
        .send({
          gas: process.env.GAS.ADD_FORECAST,
          from: rootState.user.userWeb3.coinbase
        })
        .on('error', () => {
          commit('setTransactionError', true)
        })
        .once('transactionHash', async txId => {
          try {
            await axios.post('/predictions/transaction/addForecast', { forecastId: payload.forecastId, txId })
            commit('setTransactionHash', txId)
            dispatch('getUserForecast', payload.forecastId)
          } catch (ex) {}
        })
    } catch (ex) {}
  },

  async getUserForecast ({ commit, dispatch }, forecastId) {
    commit('setLoading', true, { root: true })

    try {
      const response = await axios.get('/predictions/forecast/' + forecastId)
      if (response.data) {
        commit('setUserForecast', response.data)
        const forecast = response.data.item

        if (forecast !== null) {
          const forecastStatus = forecast.status.toUpperCase()
          const predictionStatus = forecast.predictionStatus.toUpperCase()

          if (
            (
              forecast.predictionId &&
              forecastStatus !== 'NOTSET' &&
              forecastStatus !== 'DRAFT' &&
              forecastStatus !== 'PENDINGPAYMENT' &&
              forecastStatus !== 'AVAILABLEREFUND' &&
              predictionStatus !== 'CANCELED'
            ) || predictionStatus === 'RESOLVED'
          ) {
            dispatch('getPredictionStatisticsForForecast', forecastId)
          }
        }

        commit('setLoading', false, {
          root: true
        })
      }
    } catch (ex) {
      commit('setLoading', false, {
        root: true
      })
    }
  },

  async payoutWon ({ commit, dispatch, rootState }, payload) {
    commit('setTransactionHash', '')
    commit('setTransactionError', false)
    const response = await axios.get(`/contracts/${payload.marketAddress}`)

    if (response.data) {
      const web3 = rootState.user.userWeb3.web3()
      const MarketInstance = new web3.eth.Contract(JSON.parse(response.data.abi), payload.marketAddress)
      const predictionIdHex = web3.utils.fromAscii(payload.predictionId)
      const forecastIdHex = web3.utils.fromAscii(payload.id)

      MarketInstance.methods
        .payout(predictionIdHex, forecastIdHex)
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

            await axios.post('/predictions/transaction/forecastpayout', request)

            commit('setTransactionHash', txId)
            dispatch('getUserForecast', payload.id)
          } catch (ex) {}
        })
    }
  },

  async payoutRefund ({ commit, dispatch, rootState }, payload) {
    commit('setTransactionHash', '')
    commit('setTransactionError', false)
    const response = await axios.get(`/contracts/${payload.marketAddress}`)

    if (response.data) {
      const web3 = rootState.user.userWeb3.web3()
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
  },

  async deleteForecast ({ commit }, id) {
    commit('setLoading', true, { root: true })

    try {
      await axios.delete(`/predictions/forecast/${id}`)
    } catch (err) {}

    commit('setLoading', false, { root: true })
  }
}
