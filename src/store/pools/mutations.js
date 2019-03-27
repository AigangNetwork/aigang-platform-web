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

  setPoolsPagesAndItems (state, payload) {
    state.pools.totalPages = payload.totalPages
    state.pools.totalItems = payload.totalItems
  },

  setContribution (state, payload) {
    state.contribution = payload
  },

  setUserContributions (state, payload) {
    state.userContributions = payload
  },

  setContributionsPagesAndItems (state, payload) {
    state.userContributions.totalPages = payload.totalPages
    state.userContributions.totalItems = payload.totalItems
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
