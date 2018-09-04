const getters = {
  dataset: state => {
    return state.dataset
  },
  model: state => {
    return state.model
  },
  product: state => {
    return state.product
  },
  loading: state => {
    return state.loading
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
