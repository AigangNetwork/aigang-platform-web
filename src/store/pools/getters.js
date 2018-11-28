const getters = {
  pools: state => state.pools,
  currentPool: state => state.currentPool,
  currentContribution: state => state.currentContribution,
  userContributions: state => state.userContributions,
  transactionHash: state => state.transactionHash,
  transactionError: state => state.transactionError,
  portfolioSummary: state => state.portfolioSummary,
  portfolioSummaryLoading: state => state.portfolioSummaryLoading,
  contributionsListLoading: state => state.contributionsListLoading
}

export default getters
