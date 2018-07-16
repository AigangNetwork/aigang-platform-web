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
  userPolicies: state => {
    return state.user.policies
  }
}

export default getters
