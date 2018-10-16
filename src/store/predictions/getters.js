const getters = {
  predictions: state => state.predictions,
  userForecasts: state => state.userForecasts,
  prediction: state => state.prediction,
  userForecast: state => state.userForecast,
  statisticsLoading: state => state.statisticsLoading,
  predictionStatistics: state => state.predictionStatistics,
  transactionHash: state => state.transactionHash,
  transactionError: state => state.transactionError
}

export default getters
