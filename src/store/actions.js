
export default {
  showInsufficientBalanceDialog ({ commit }, show) {
    commit('showInsufficientBalanceDialog', show)
  },

  showBugBountyDialog ({ commit }, show) {
    commit('showBugBountyDialog', show)
  }
}
