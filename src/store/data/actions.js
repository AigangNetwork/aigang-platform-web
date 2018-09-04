import axios from 'axios'

export default {
  async loadDataset ({ commit }, id) {
    const response = await axios.get('/data/' + id)
    if (response.data.data) {
      commit('LOAD_DATASET', response.data)
    } else {
      commit('CLEAR_DATASET')
    }
  },

  clearDataset ({ commit }) {
    commit('CLEAR_DATASET')
  },

  clearModel ({ commit }) {
    commit('CLEAR_MODEL')
  },

  setRemoteFileAccessPoint ({ commit }, response) {
    commit('SET_REMOTE_FILE_ACCESS_POINT', response)
  },

  setdatasetFile ({ commit }, response) {
    commit('SET_DATASET_FILE', response)
  },

  setIsFileRemote ({ commit }, response) {
    commit('SET_IS_FILE_REMOTE', response)
  },

  setHasFileChanged ({ commit }, response) {
    commit('SET_HAS_FILE_CHANGED', response)
  },

  async loadModel ({ commit }, payload) {
    const response = await axios.get(`/data/${payload.datasetId}/models/${payload.modelId}`)
    commit('LOAD_MODEL', response.data)
  }
}
