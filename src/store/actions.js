export default {
  showInsufficientBalanceDialog ({ commit }, show) {
    commit('showInsufficientBalanceDialog', show)
  },

  showBugBountyDialog ({ commit }, show) {
    commit('showBugBountyDialog', show)
  },

  resetRootState ({ dispatch }) {
    dispatch('user/resetState')
    dispatch('insurance/resetState')
    dispatch('predictions/resetState')
  }
}
