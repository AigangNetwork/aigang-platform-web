export default {
  resetState (state, newState) {
    Object.assign(state, newState)
  },

  addAbi (state, payload) {
    state.abiCache[payload.address] = payload.abi
  }
}
