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
  setCurrentPrediction (state, payload) {
    state.currentPrediction = payload.item
  },
  setCurrentUserForecast (state, payload) {
    state.currentUserForecast = payload.item
  }
}

export default mutations
