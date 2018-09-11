const getters = {
  predictions: state => state.predictions,
  userForecasts: state => state.userForecasts,
  prediction: state => state.currentPrediction,
  userForecast: state => state.currentUserForecast
}

export default getters
