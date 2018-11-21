const getters = {
  pools: state => state.pools,
  currentPool: state => state.currentPool,
  currentContribution: state => state.currentContribution,
  userContributions: state => state.userContributions,
  transactionHash: state => state.transactionHash,
  transactionError: state => state.transactionError
}

export default getters
