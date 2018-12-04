export default {
  showInsufficientBalanceDialog ({ commit }, show) {
    commit('showInsufficientBalanceDialog', show)
  },

  resetRootState ({ dispatch }) {
    dispatch('user/resetState')
    dispatch('insurance/resetState')
    dispatch('predictions/resetState')
  }
}
