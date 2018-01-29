const mutations = {
  'LOGIN' (state, token) {
    state.user.authenticated = true
    state.user.token = token
  }
}

export default mutations
