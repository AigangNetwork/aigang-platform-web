const mutations = {
  resetState (state, newState) {
    Object.assign(state, newState)
  },

  setPools (state, payload) {
    state.pools = payload
  },

  setPool (state, payload) {
    state.pool = payload
  },

  setContribution (state, payload) {
    state.contribution = payload
  },

  setUserContributions (state, payload) {
    state.userContributions = payload
  },

  setTransactionHash (state, transactionHash) {
    state.transactionHash = transactionHash
  },

  setTransactionError (state, value) {
    state.transactionError = value
  },

  setPortfolioSummary (state, value) {
    state.portfolioSummary = value
  },

  setPortfolioSummaryLoading (state, value) {
    state.portfolioSummaryLoading = value
  },

  setContributionsListLoading (state, value) {
    state.contributionsListLoading = value
  }
}

export default mutations
