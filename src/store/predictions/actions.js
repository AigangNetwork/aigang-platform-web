import axios from 'axios'

export default {
  async getPredictionsList ({ commit }, page) {
    commit('SET_LOADING', true, { root: true })

    try {
      const response = await axios.get('/predictions/list?page=' + page)
      if (response.data) {
        commit('setPredictions', response.data)
      }

      commit('SET_LOADING', false, { root: true })
    } catch (ex) {
      commit('SET_LOADING', false, { root: true })
    }
  },

  async getPrediction ({ commit }, id) {
    commit('SET_LOADING', true, { root: true })

    try {
      const response = await axios.get('/predictions/prediction/' + id)
      if (response.data) {
        commit('setPrediction', response.data)
      }

      commit('SET_LOADING', false, { root: true })
    } catch (ex) {
      commit('SET_LOADING', false, { root: true })
    }
  },

  async makeForecast ({ commit, rootState, dispatch, state }, payload) {
    commit('SET_LOADING', true, { root: true })

    const abiResponse = await axios.get('contracts/' + state.prediction.marketAddress)

    const marketAbi = JSON.parse(abiResponse.data.abi)

    const web3 = rootState.user.userWeb3.web3()
    const TokenInstance = new web3.eth.Contract(process.env.CONTRACT_INFO.ABI, process.env.CONTRACT_INFO.ADDRESS)
    const paymentValue = web3.utils.toWei(payload.amount.toString())
    const MarketInstance = new web3.eth.Contract(marketAbi, state.prediction.marketAddress)
    const predictionIdBytes = web3.utils.fromAscii(payload.predictionId)

    TokenInstance.methods
      .approveAndCall(state.prediction.marketAddress, paymentValue, predictionIdBytes)
      .send({
        gas: 190000,
        from: rootState.user.userWeb3.coinbase
      })
      .once('transactionHash', async txHash => {
        MarketInstance.methods
          .addForecast(predictionIdBytes, paymentValue, Number(payload.outcomeId))
          .send({
            gas: 190000,
            from: rootState.user.userWeb3.coinbase
          })
          .once('transactionHash', async txHash => {
            try {
              await axios.post('/predictions/prediction/forecast', payload)
              commit('SET_LOADING', false, { root: true })
            } catch (ex) {
              commit('SET_LOADING', false, { root: true })
            }
          })
      })
  },

  async getUserForecasts ({ commit }, page) {
    commit('SET_LOADING', true, { root: true })

    try {
      const response = await axios.get('/predictions/myforecasts?page=' + page)

      if (response.data) {
        commit('setUserForecasts', response.data)
      }

      commit('SET_LOADING', false, { root: true })
    } catch (ex) {
      commit('SET_LOADING', false, { root: true })
    }
  },

  async getUserForecast ({ commit, dispatch }, id) {
    commit('SET_LOADING', true, { root: true })

    try {
      const response = await axios.get('/predictions/forecast/' + id)
      if (response.data) {
        commit('setUserForecast', response.data)

        if (response.data.item && response.data.item.predictionId) {
          dispatch('getPredictionStatistics', response.data.item.predictionId)
        } else {
          commit('SET_LOADING', false, { root: true })
        }
      }
    } catch (ex) {
      commit('SET_LOADING', false, { root: true })
    }
  },

  async getPredictionStatistics ({ commit }, predictionId) {
    commit('SET_LOADING', true, { root: true })

    const payload = {
      predictionId
    }

    try {
      const response = await axios.post('/predictions/prediction/getStatistics', payload)

      if (response.data) {
        commit('setPredictionStatistics', response.data)
      }

      commit('SET_LOADING', false, { root: true })
    } catch (ex) {
      commit('SET_LOADING', false, { root: true })
    }
  }
}
