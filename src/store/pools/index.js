import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    pools: [],
    currentPool: {},
    portfolioSummary: {},
    portfolioSummaryLoading: false,
    contributionsListLoading: false,
    currentContribution: {},
    userContributions: [],
    transactionHash: '',
    transactionError: false
  },
  mutations,
  actions,
  getters
}
