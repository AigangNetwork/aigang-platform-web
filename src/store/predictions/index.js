import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export const initialPredictionsState = () => {
  return {
    predictions: [],
    userForecasts: [],
    prediction: {},
    userForecast: {},
    countPerOutcomeStatisticsLoading: false,
    amountPerOutcomeStatisticsLoading: false,
    countPerOutcomeStatistics: {},
    amountPerOutcomeStatistics: {},
    transactionHash: '',
    transactionError: false
  }
}

export default {
  namespaced: true,
  state: initialPredictionsState(),
  mutations,
  actions,
  getters
}
