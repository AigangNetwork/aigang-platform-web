const mutations = {
  LOAD_DATASET (state, payload) {
    state.dataset = payload.data
    state.dataset.commentsCount = payload.commentsCount
    state.dataset.modelsCount = payload.modelsCount
    if (state.dataset.remoteFileAccessPoint) {
      state.dataset.isFileRemote = true
    } else {
      state.dataset.isFileRemote = false
    }
    if (payload.tags) {
      state.dataset.tags = payload.tags
    }
  },
  SET_REMOTE_FILE_ACCESS_POINT (state, payload) {
    state.dataset.remoteFileAccessPoint = payload.remoteFileAccessPoint
  },
  SET_DATASET_FILE (state, payload) {
    state.dataset.file = payload.file
    state.dataset.isFileRemote = false
    state.dataset.hasFileChanged = true
  },
  SET_IS_FILE_REMOTE (state, payload) {
    state.dataset.isFileRemote = payload.isFileRemote
  },
  SET_HAS_FILE_CHANGED (state, payload) {
    state.dataset.hasFileChanged = payload.hasFileChanged
  },
  LOAD_MODEL (state, payload) {
    if (payload.data) {
      state.model = payload.data
      state.model.userName = payload.userName
      state.model.commentsCount = payload.commentsCount
    }
  },
  CLEAR_DATASET (state) {
    state.dataset = {}
  },
  CLEAR_MODEL (state) {
    state.model = {}
  },
  LOAD_CURRENT_PRODUCT (state, payload) {
    state.product = payload.product
  },
  CLEAR_CURRENT_PRODUCT (state) {
    state.product = {}
  },
  SET_LOADING (state, loading) {
    state.loading = loading
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
  }
}

export default mutations
