const mutations = {
  setPools (state, payload) {
    state.pools = payload
  },

  setPool (state, payload) {
    state.currentPool = payload
  },

  setUserContributions (state, payload) {
    state.userContributions = payload
  }
}

export default mutations
