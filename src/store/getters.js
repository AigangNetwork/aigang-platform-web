const getters = {
  isAuthenticated: state => {
    return state.user.authenticated
  },
  token: state => {
    return state.user.token
  },
  dataset: state => {
    return state.currentDataset
  }
}

export default getters
