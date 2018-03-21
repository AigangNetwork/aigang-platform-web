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
  }
}

export default mutations
