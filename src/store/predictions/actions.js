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

  async makeForecast ({ commit, rootState, state }, payload) {
    commit('SET_LOADING', true, { root: true })

    const web3 = rootState.user.userWeb3.web3()
    const TokenInstance = new web3.eth.Contract(process.env.CONTRACT_INFO.ABI, process.env.CONTRACT_INFO.ADDRESS)
    const paymentValue = web3.utils.toWei(payload.amount.toString())

    const predictionIdBytes = web3.utils.fromAscii(payload.predictionId)
    let outcomeHex = payload.outcome.toString(16)
    if (outcomeHex.length === 1) {
      outcomeHex = '0' + outcomeHex
    }

    const predictionBytes = predictionIdBytes + outcomeHex

    debugger
    TokenInstance.methods
      .approveAndCall(state.prediction.marketAddress, paymentValue, predictionBytes)
      .send({
        gas: 400000,
        from: rootState.user.userWeb3.coinbase
      })
      .once('transactionHash', async txHash => {
        try {
          const request = {
            predictionId: payload.predictionId,
            outcomeId: payload.outcomeId,
            amount: payload.amount
          }

          await axios.post('/predictions/prediction/forecast', request)
          commit('SET_LOADING', false, { root: true })
        } catch (ex) {
          commit('SET_LOADING', false, { root: true })
        }
      })
  },

  async getUserForecasts ({ commit }, page) {
    commit('SET_LOADING', true, {
      root: true
    })

    try {
      const response = await axios.get('/predictions/myforecasts?page=' + page)

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

  async getUserForecast ({ commit, dispatch }, id) {
    commit('SET_LOADING', true, {
      root: true
    })

    try {
      const response = await axios.get('/predictions/forecast/' + id)
      if (response.data) {
        commit('setUserForecast', response.data)

        if (response.data.item && response.data.item.predictionId) {
          dispatch('getPredictionStatistics', response.data.item.predictionId)
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
  },

  async getPredictionStatistics ({ commit }, predictionId) {
    commit('SET_LOADING', true, {
      root: true
    })

    const payload = {
      predictionId
    }

    try {
      const response = await axios.post('/predictions/prediction/getStatistics', payload)

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
  }
}
