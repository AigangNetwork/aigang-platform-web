export default {
  loadDataset (state, payload) {
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

  setRemoteFileAccessPoint (state, payload) {
    state.dataset.remoteFileAccessPoint = payload.remoteFileAccessPoint
  },

  setDatasetFile (state, payload) {
    state.dataset.file = payload.file
    state.dataset.isFileRemote = false
    state.dataset.hasFileChanged = true
  },

  setIsFileRemote (state, payload) {
    state.dataset.isFileRemote = payload.isFileRemote
  },

  setHasFileChanged (state, payload) {
    state.dataset.hasFileChanged = payload.hasFileChanged
  },

  loadModel (state, payload) {
    if (payload.data) {
      state.model = payload.data
      state.model.userName = payload.userName
      state.model.commentsCount = payload.commentsCount
    }
  },

  clearDataSet (state) {
    state.dataset = {}
  },

  clearModel (state) {
    state.model = {}
  }
}
