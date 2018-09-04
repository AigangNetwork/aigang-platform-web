const getters = {
  loading: state => {
    return state.loading
  },
  product: state => {
    return state.product
  },
  policy: state => {
    return state.policy
  },
  userPolicies: state => {
    return state.userPolicies
  },
  policyLoadingInfo: state => {
    return state.policyLoadingInfo
  },
  isPolicyLoadingVisible: state => {
    return state.isPolicyLoadingVisible
  },
  txHash: state => {
    return state.txHash
  }
}

export default getters
