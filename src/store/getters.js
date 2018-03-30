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
  isDatasetAccessPoint: state => {
    if (state.currentDataset.remoteFileAccessPoint) {
      return true
    } else {
      return false
    }
  }
}

export default getters
