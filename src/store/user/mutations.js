export default {
  login (state, payload) {
    state.authenticated = true
    state.profile = payload.profile
  },

  resetState (state, newState) {
    // Let's keep web3
    newState.userWeb3 = state.userWeb3
    newState.userWeb3.aixBalance = parseInt(state.userWeb3.aixBalance, 10)
    newState.insufficientBalance = state.userWeb3.aixBalance === 0
    newState.isWeb3Enabled = !!state.userWeb3
    newState.isWeb3Loaded = true
    Object.assign(state, newState)
  },

  changeProfileNames (state, payload) {
    state.profile.firstName = payload.data.profile.firstName
    state.profile.lastName = payload.data.profile.lastName
    state.profile.userName = payload.data.profile.userName
  },

  setWeb3Info (state, payload) {
    state.userWeb3 = payload
    state.userWeb3.aixBalance = parseInt(state.userWeb3.aixBalance, 10)
    state.insufficientBalance = state.userWeb3.aixBalance === 0
    state.isWeb3Enabled = !!state.userWeb3
    state.isWeb3Loaded = true
  },

  clearWeb3Instance (state) {
    state.isWeb3Loaded = false
    state.userWeb3 = {}
    state.isWeb3Enabled = false
  },

  turnOffWeb3Instance (state) {
    state.userWeb3 = {}
    state.isWeb3Enabled = false
  },

  setEmailOptOut (state, payload) {
    state.emailPermissionGroups.map(g => {
      g.items.map(i => {
        if (i.id === payload.id) {
          i.value = payload.value
        }
      })
    })
  },

  setNotifciationPermissions (state, payload) {
    payload.emailPermissionGroups.map(g => {
      g.items.map(i => {
        if (payload.response && payload.response.ids && payload.response.ids.includes(i.id)) {
          i.value = false
        }
      })
    })

    state.emailPermissionGroups = payload.emailPermissionGroups
  },

  setAuthToken (state, value) {
    state.token = value
  }
}
