export default {
  LOAD_CURRENT_PRODUCT (state, payload) {
    state.product = payload.product
  },

  CLEAR_CURRENT_PRODUCT (state) {
    state.product = {}
  },

  SET_POLICY (state, payload) {
    state.policy = payload.policy
    state.policy.isClaimable = true
  },

  CLEAR_POLICY (state) {
    state.policy = {}
  },

  SET_POLICY_LOADING_INFO (state, policyLoadingInfo) {
    state.policyLoadingInfo = policyLoadingInfo
  },

  CLEAR_POLICY_LOADING_INFO (state) {
    state.policyLoadingInfo = {}
  },

  SET_TX_HASH (state, txHash) {
    state.txHash = txHash
  },

  SET_POLICY_LOADING_FAILED (state, value) {
    state.policyLoadingInfo.failed = value
  },

  SET_IS_POLICY_LOADING_VISIBLE (state, value) {
    state.isPolicyLoadingVisible = value
  },

  LOAD_USER_POLICIES (state, policies) {
    state.userPolicies = policies
  },

  setTransactionError (state, value) {
    state.transactionError = value
  }
}
