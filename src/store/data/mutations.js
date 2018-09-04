export default {
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
  }
}
