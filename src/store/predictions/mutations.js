const mutations = {
  setLoader (state, value) {
    state.loading = value
  },
  setPredictions (state, payload) {
    state.predictions = payload
  },
  setUserForecasts (state, payload) {
    state.userForecasts = payload
  },
  setPrediction (state, payload) {
    state.prediction = payload.item
  },
  setUserForecast (state, payload) {
    state.userForecast = payload.item
  },
  setPredictionStatistics (state, payload) {
    state.predictionStatistics = payload.statistics
  }
}

export default mutations
