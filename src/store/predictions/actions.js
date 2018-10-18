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

  async getPredictionStatistics ({ commit }, predictionId) {
    commit('statisticsLoading', true)

    try {
      const response = await axios.get('/predictions/stats/' + predictionId)

      if (response.data) {
        commit('setPredictionStatistics', response.data)
      }

      commit('statisticsLoading', false)
    } catch (ex) {
      commit('statisticsLoading', false)
    }
  },

  async getPredictionStatisticsForForecast ({ commit }, forecastId) {
    commit('statisticsLoading', true)

    try {
      const response = await axios.get('/predictions/forecast/stats/' + forecastId)

      if (response.data) {
        commit('setPredictionStatistics', response.data)
      }

      commit('statisticsLoading', false)
    } catch (ex) {
      commit('statisticsLoading', false)
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

        if (
          forecast && (
            (
              forecast.predictionId &&
              forecast.status.toUpperCase() !== 'NOTSET' &&
              forecast.status.toUpperCase() !== 'DRAFT' &&
              forecast.status.toUpperCase() !== 'PENDINGPAYMENT'
            ) || forecast.predictionStatus.toUpperCase() === 'RESOLVED'
          )
        ) {
          dispatch('getPredictionStatisticsForForecast', forecastId)
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

  async payout ({ commit, dispatch, rootState }, payload) {
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
