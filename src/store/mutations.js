const mutations = {
  LOGIN (state, payload) {
    state.user.authenticated = true
    state.user.token = payload.token
    state.user.profile = payload.profile
  },
  LOGOUT (state) {
    state.user.authenticated = false
    state.user.token = ''
    state.user.profile = ''
  },
  CHANGE_PROFILE_NAMES (state, payload) {
    state.user.profile.firstName = payload.profile.firstName
    state.user.profile.firstName = payload.profile.lastName
    state.user.profile.firstName = payload.profile.userName
  },
  SET_CURRENT_DATASET (state, payload) {
    state.currentDataset = payload.data
  },
  SET_REMOTE_FILE_ACCESS_POINT (state, payload) {
    state.currentDataset.remoteFileAccessPoint = payload.remoteFileAccessPoint
  },
  SET_CURRENT_DATASET_FILE (state, payload) {
    state.currentDataset.file = payload.file
  }
}

export default mutations
