import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    pools: [],
    pool: {},
    portfolioSummary: {},
    portfolioSummaryLoading: false,
    contributionsListLoading: false,
    contribution: {},
    userContributions: [],
    transactionHash: '',
    transactionError: false
  },
  mutations,
  actions,
  getters
}
