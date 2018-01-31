const mutations = {
  'LOGIN' (state, user) {
    state.user.authenticated = true
    state.user.token = user.token
    state.user.profile = user.profile
  }
}

export default mutations
