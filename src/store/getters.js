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
  wallets: state => {
    return state.user.wallets
  },
  transactions: state => {
    return state.user.transactions
  },
  emailPermissionGroups: state => {
    return state.user.emailPermissionGroups
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
  userPolicies: state => {
    return state.user.policies
  },
  policyLoadingInfo: state => {
    return state.policyLoadingInfo
  },
  isPolicyLoadingVisible: state => {
    return state.isPolicyLoadingVisible
  },
  web3: state => {
    return state.userWeb3.web3Instance ? state.userWeb3.web3Instance() : null
  },
  txHash: state => {
    return state.txHash
  }
}

export default getters
