const mutations = {
  resetState (state, newState) {
    Object.assign(state, newState)
  },

  setPredictions (state, payload) {
    state.predictions = payload
  },

  setUserForecasts (state, payload) {
    state.userForecasts = payload
  },

  setPrediction (state, payload) {
    state.prediction = payload.item
    state.predictionStatistics = {}
  },

  setUserForecast (state, payload) {
    state.userForecast = payload.item
    state.predictionStatistics = {}
  },

  setCountPerOutcomeStatisticsLoading (state, loading) {
    state.countPerOutcomeStatisticsLoading = loading
  },

  setAmountPerOutcomeStatisticsLoading (state, loading) {
    state.amountPerOutcomeStatisticsLoading = loading
  },

  setCountPerOutcomeStatistics (state, payload) {
    state.countPerOutcomeStatistics = payload
  },

  setAmountPerOutcomeStatistics (state, payload) {
    state.amountPerOutcomeStatistics = payload
  },

  setTransactionHash (state, transactionHash) {
    state.transactionHash = transactionHash
  },

  setTransactionError (state, value) {
    state.transactionError = value
  }
}

export default mutations
