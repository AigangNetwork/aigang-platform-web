const mutations = {
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
  setPredictionStatistics (state, payload) {
    state.predictionStatistics = payload.statistics
  },
  setTransactionHash (state, transactionHash) {
    state.transactionHash = transactionHash
  },
  statisticsLoading (state, loading) {
    state.statisticsLoading = loading
  },
  setTransactionError (state, value) {
    state.transactionError = value
  }
}

export default mutations
