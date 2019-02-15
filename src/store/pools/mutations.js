const mutations = {
  resetState (state, newState) {
    Object.assign(state, newState)
  },

  setPools (state, payload) {
    state.pools = payload
  },

  addPoolToList (state, pool) {
    state.pools.items.push(pool)
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

  setUserContributionsTotalPages (state, totalPages) {
    state.userContributions.totalPages = totalPages
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
  },

  addContribution (state, contribution) {
    state.userContributions.items.push(contribution)
  }
}

export default mutations
