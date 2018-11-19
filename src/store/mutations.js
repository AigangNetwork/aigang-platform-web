export default {
  setLoading (state, loading) {
    state.loading = loading
  },
  showInsufficientBalanceDialog (state, visible) {
    state.insufficientBalanceDialogVisible = visible
  },
  showBugBountyDialog (state, visible) {
    state.bugBountyDialogVisible = visible
  }
}
