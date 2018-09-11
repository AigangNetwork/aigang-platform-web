import axios from 'axios'

const actions = {
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
        commit('setCurrentPrediction', response.data)
      }

      commit('SET_LOADING', false, { root: true })
    } catch (ex) {
      commit('SET_LOADING', false, { root: true })
    }
  },
  async makeForecast ({ commit }, payload) {
    commit('SET_LOADING', true, { root: true })

    try {
      await axios.post('/predictions/prediction/forecast', payload)
      commit('SET_LOADING', false, { root: true })
    } catch (ex) {
      commit('SET_LOADING', false, { root: true })
    }
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
  async getUserForecast ({ commit }, id) {
    commit('SET_LOADING', true, { root: true })

    try {
      const response = await axios.get('/predictions/forecast/' + id)
      if (response.data) {
        commit('setCurrentUserForecast', response.data)
      }

      commit('SET_LOADING', false, { root: true })
    } catch (ex) {
      commit('SET_LOADING', false, { root: true })
    }
  }
}

export default actions
