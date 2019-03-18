import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export const initialInsuranceState = () => {
  return {
    products: {},
    policy: {},
    txHash: null,
    policyLoadingInfo: {},
    isPolicyLoadingVisible: false,
    transactionError: false,
    userPolicies: {
      items: [],
      totalPages: 0
    }
  }
}

export default {
  namespaced: true,
  state: initialInsuranceState(),
  actions,
  mutations,
  getters
}
