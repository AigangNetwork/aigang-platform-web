import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export const initialPoolState = () => {
  return {
    pools: [],
    pool: {},
    portfolioSummary: {},
    portfolioSummaryLoading: false,
    contributionsListLoading: false,
    contribution: {},
    userContributions: [],
    transactionHash: '',
    transactionError: false
  }
}

export default {
  namespaced: true,
  state: initialPoolState(),
  mutations,
  actions,
  getters
}
