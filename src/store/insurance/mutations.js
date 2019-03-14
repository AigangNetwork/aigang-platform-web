export default {
  resetState (state, newState) {
    Object.assign(state, newState)
  },

  setProducts (state, payload) {
    state.products = payload
  },

  addProductToList (state, pool) {
    state.products.items.push(pool)
  },

  setProductsTotalPages (state, totalPages) {
    state.products.totalPages = totalPages
  },

  setProduct (state, payload) {
    state.product = payload
  },

  // --------

  setIsPolicyLoadingVisible (state, value) {
    state.isPolicyLoadingVisible = value
  },

  clearCurrentProduct (state) {
    state.product = {}
  },

  setPolicy (state, payload) {
    state.policy = payload.policy
    state.policy.isClaimable = true
  },

  clearPolicy (state) {
    state.policy = {}
  },

  setPolicyLoadingInfo (state, policyLoadingInfo) {
    state.policyLoadingInfo = policyLoadingInfo
  },

  clearPolicyLoadingInfo (state) {
    state.policyLoadingInfo = {}
  },

  setTxHash (state, txHash) {
    state.txHash = txHash
  },

  setPolicyLoadingFailed (state, value) {
    state.policyLoadingInfo.failed = value
  },

  loadUserPolicies (state, policies) {
    state.userPolicies = policies
  },

  setTransactionError (state, value) {
    state.transactionError = value
  }
}
