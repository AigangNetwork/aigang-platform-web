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
  }
}

export default getters
