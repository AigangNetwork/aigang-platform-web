import actions from './actions'
import mutations from './mutations'
import getters from './getters'

export const initialInsuranceState = () => {
  return {
    products: {},

    policy: {},
    userPolicies: {},
    txHash: null,
    policyLoadingInfo: {},
    isPolicyLoadingVisible: false,
    transactionError: false
  }
}

export default {
  namespaced: true,
  state: initialInsuranceState(),
  actions,
  mutations,
  getters
}
