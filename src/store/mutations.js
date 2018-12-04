export default {
  setLoading (state, loading) {
    state.loading = loading
  },

  showInsufficientBalanceDialog (state, visible) {
    state.insufficientBalanceDialogVisible = visible
  },

  resetRootState (state, rootState) {
    state = rootState
    state.loading = false
    state.insufficientBalanceDialogVisible = false
  },

  setIsCookiesEnabled (state, value) {
    state.isCookiesEnabled = value
  },

  setShowMetamaskNetworkError (state, value) {
    state.showMetamaskNetworkError = value
  }
}
