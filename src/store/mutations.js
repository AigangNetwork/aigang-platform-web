const mutations = {
  'LOGIN' (state, payload) {
    state.user.authenticated = true
    state.user.token = payload.token
    state.user.profile = payload.profile
  },
  'LOGOUT' (state) {
    state.user.authenticated = false
    state.user.token = ''
    state.user.profile = ''
  }
}

export default mutations
