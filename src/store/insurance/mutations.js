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

  setPolicy (state, policy) {
    state.policy = policy
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

  setUserPolicies (state, payload) {
    state.userPolicies = payload
  },

  setUserPoliciesTotalPages (state, totalPages) {
    state.userPolicies.totalPages = totalPages
  },

  addPolicy (state, policy) {
    state.userPolicies.items.push(policy)
  },

  setTransactionError (state, value) {
    state.transactionError = value
  }
}
