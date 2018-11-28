const getters = {
  predictions: state => state.predictions,
  userForecasts: state => state.userForecasts,
  prediction: state => state.prediction,
  userForecast: state => state.userForecast,
  countPerOutcomeStatisticsLoading: state => state.countPerOutcomeStatisticsLoading,
  amountPerOutcomeStatisticsLoading: state => state.amountPerOutcomeStatisticsLoading,
  countPerOutcomeStatistics: state => { return state.countPerOutcomeStatistics },
  amountPerOutcomeStatistics: state => state.amountPerOutcomeStatistics,
  transactionHash: state => state.transactionHash,
  transactionError: state => state.transactionError
}

export default getters
