const mutations = {
  'LOGIN' (state, payload) {
    state.user.authenticated = true
    state.user.token = payload.token
    state.user.profile = payload.profile
  }
}

export default mutations
