const getters = {
  isAuthenticated: state => {
    return state.user.authenticated
  },
  token: state => {
    return state.user.token
  },
  dataset: state => {
    return state.currentDataset
  },
  model: state => {
    return state.currentModel
  },
  product: state => {
    return state.currentProduct
  },
  loading: state => {
    return state.loading
  },
  policy: state => {
    return state.currentPolicy
  },
  policyLoadingInfo: state => {
    return state.policyLoadingInfo
  },
  web3: state => {
    return state.userWeb3.web3Instance ? state.userWeb3.web3Instance() : null
  },
  txHash: state => {
    return state.txHash
  }
}

export default getters
