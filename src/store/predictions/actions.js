import axios from 'axios'

export default {
  async getPredictionsList ({ commit }, page) {
    commit('SET_LOADING', true, {
      root: true
    })

    try {
      const response = await axios.get('/predictions/list?page=' + page)
      if (response.data) {
        commit('setPredictions', response.data)
      }

      commit('SET_LOADING', false, {
        root: true
      })
    } catch (ex) {
      commit('SET_LOADING', false, {
        root: true
      })
    }
  },

  async getPrediction ({ commit }, id) {
    commit('SET_LOADING', true, {
      root: true
    })

    try {
      const response = await axios.get('/predictions/prediction/' + id)
      if (response.data) {
        commit('setPrediction', response.data)
      }

      commit('SET_LOADING', false, {
        root: true
      })
    } catch (ex) {
      commit('SET_LOADING', false, {
        root: true
      })
    }
  },

  async getPredictionStatistics ({ commit }, forecastId) {
    commit('SET_LOADING', true, {
      root: true
    })

    try {
      const response = await axios.get('/predictions/stats/' + forecastId)

      if (response.data) {
        commit('setPredictionStatistics', response.data)
      }

      commit('SET_LOADING', false, {
        root: true
      })
    } catch (ex) {
      commit('SET_LOADING', false, {
        root: true
      })
    }
  },

  async getUserForecasts ({ commit }, payload) {
    commit('SET_LOADING', true, {
      root: true
    })

    try {
      const response = await axios.get(`/predictions/myforecasts?page=${payload.page}&status=${payload.filter.status}`)

      if (response.data) {
        commit('setUserForecasts', response.data)
      }

      commit('SET_LOADING', false, {
        root: true
      })
    } catch (ex) {
      commit('SET_LOADING', false, {
        root: true
      })
    }
  },

  async addForecast ({ commit, rootState, state }, payload) {
    commit('setTransactionHash', '')

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

        TokenInstance.methods
          .approveAndCall(state.prediction.marketAddress, paymentValue, predictionIdHex + forecastIdHex + outcomeHex)
          .send({
            gas: 400000,
            from: rootState.user.userWeb3.coinbase
          })
          .once('transactionHash', async txId => {
            try {
              const payload = {
                forecastId: response.data.forecast.id,
                txId
              }

              await axios.post('/transaction/addForecast', payload)

              commit('setTransactionHash', txId)
            } catch (ex) {}
          })
      }
    } catch (ex) {}
  },

  async getUserForecast ({ commit, dispatch }, forecastId) {
    commit('SET_LOADING', true, { root: true })

    try {
      const response = await axios.get('/predictions/forecast/' + forecastId)
      if (response.data) {
        commit('setUserForecast', response.data)
        const forecast = response.data.item

        if (
          forecast &&
          forecast.predictionId &&
          forecast.status.toUpperCase() !== 'NOTSET' &&
          forecast.status.toUpperCase() !== 'DRAFT' &&
          forecast.status.toUpperCase() !== 'PENDINGPAYMENT'
        ) {
          dispatch('getPredictionStatistics', forecastId)
        } else {
          commit('SET_LOADING', false, {
            root: true
          })
        }
      }
    } catch (ex) {
      commit('SET_LOADING', false, {
        root: true
      })
    }
  }
}
