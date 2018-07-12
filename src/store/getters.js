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
  }
}

export default getters
