import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    predictions: [],
    userForecasts: [],
    prediction: {},
    userForecast: {},
    statisticsLoading: false,
    predictionStatistics: {},
    transactionHash: '',
    transactionError: false
  },
  mutations,
  actions,
  getters
}
