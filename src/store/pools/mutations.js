const mutations = {
  setPools (state, payload) {
    state.pools = payload
  },

  setPool (state, payload) {
    state.currentPool = payload
  },

  setContribution (state, payload) {
    state.currentContribution = payload
  },

  setUserContributions (state, payload) {
    state.userContributions = payload
  },

  setTransactionHash (state, transactionHash) {
    state.transactionHash = transactionHash
  },

  setTransactionError (state, value) {
    state.transactionError = value
  }
}

export default mutations
