const getters = {
  isAuthenticated: state => {
    return state.user.authenticated
  },
  token: state => {
    return state.user.token
  },
  dataset: state => {
    return state.dataset
  },
  model: state => {
    return state.model
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
    return state.product
  },
  loading: state => {
    return state.loading
  },
  policy: state => {
    return state.policy
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
    return state.userWeb3.web3 ? state.userWeb3.web3() : null
  },
  txHash: state => {
    return state.txHash
  }
}

export default getters
