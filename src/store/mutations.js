const mutations = {
  LOGIN (state, payload) {
    state.user.authenticated = true
    state.user.token = payload.token
    state.user.profile = payload.profile
  },
  LOGOUT (state) {
    state.user.authenticated = false
    state.user.token = null
    state.user.profile = null
  },
  CHANGE_PROFILE_NAMES (state, payload) {
    state.user.profile.firstName = payload.data.profile.firstName
    state.user.profile.lastName = payload.data.profile.lastName
    state.user.profile.userName = payload.data.profile.userName
  },
  LOAD_CURRENT_DATASET (state, payload) {
    state.currentDataset = payload.data
    state.currentDataset.commentsCount = payload.commentsCount
    state.currentDataset.modelsCount = payload.modelsCount
    if (state.currentDataset.remoteFileAccessPoint) {
      state.currentDataset.isFileRemote = true
    } else {
      state.currentDataset.isFileRemote = false
    }
    if (payload.tags) {
      state.currentDataset.tags = payload.tags
    }
  },
  SET_REMOTE_FILE_ACCESS_POINT (state, payload) {
    state.currentDataset.remoteFileAccessPoint = payload.remoteFileAccessPoint
  },
  SET_CURRENT_DATASET_FILE (state, payload) {
    state.currentDataset.file = payload.file
    state.currentDataset.isFileRemote = false
    state.currentDataset.hasFileChanged = true
  },
  SET_IS_FILE_REMOTE (state, payload) {
    state.currentDataset.isFileRemote = payload.isFileRemote
  },
  SET_HAS_FILE_CHANGED (state, payload) {
    state.currentDataset.hasFileChanged = payload.hasFileChanged
  },
  SET_WEB3_INSTANCE (state, payload) {
    let result = payload
    let web3Copy = state.userWeb3
    web3Copy.coinbase = result.coinbase
    web3Copy.networkId = result.networkId
    web3Copy.ethBalance = parseInt(result.ethBalance, 10)
    web3Copy.web3Instance = result.web3
    web3Copy.aixBalance = parseInt(result.aixBalance, 10)
    web3Copy.isInjected = result.isInjected
    state.userWeb3 = web3Copy
  },
  CLEAR_WEB3_INSTANCE (state, payload) {
    state.userWeb3 = {
      web3Instance: null,
      isInjected: false,
      ethBalance: null,
      networkId: null,
      coinbase: null,
      aixBalance: null,
      error: null
    }
  },
  LOAD_CURRENT_MODEL (state, payload) {
    if (payload.data) {
      state.currentModel = payload.data
      state.currentModel.userName = payload.userName
      state.currentModel.commentsCount = payload.commentsCount
    }
  },
  CLEAR_CURRENT_DATASET (state, payload) {
    state.currentDataset = null
  },
  CLEAR_CURRENT_MODEL (state, payload) {
    state.currentModel = {}
  }
}

export default mutations
