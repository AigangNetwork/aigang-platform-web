import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export default {
  namespaced: true,
  state: {
    product: {},
    policy: {},
    userPolicies: {},
    txHash: null,
    policyLoadingInfo: {},
    isPolicyLoadingVisible: false,
    transactionError: false
  },
  actions,
  mutations,
  getters
}
