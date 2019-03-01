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

  setShowEthNetworkError (state, value) {
    state.showEthNetworkError = value
  },

  setIsEthNetworkCorrect (state, value) {
    state.isEthNetworkCorrect = value
  }
}
