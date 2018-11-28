import axios from 'axios'

export default {
  async loadDataset ({ commit }, id) {
    const response = await axios.get('/data/' + id)
    if (response.data.data) {
      commit('loadDataset', response.data)
    } else {
      commit('clearDataSet')
    }
  },

  clearDataset ({ commit }) {
    commit('clearDataSet')
  },

  clearModel ({ commit }) {
    commit('clearModel')
  },

  setRemoteFileAccessPoint ({ commit }, response) {
    commit('setRemoteFileAccessPoint', response)
  },

  setdatasetFile ({ commit }, response) {
    commit('setDatasetFile', response)
  },

  setIsFileRemote ({ commit }, response) {
    commit('setIsFileRemote', response)
  },

  setHasFileChanged ({ commit }, response) {
    commit('setHasFileChanged', response)
  },

  async loadModel ({ commit }, payload) {
    const response = await axios.get(`/data/${payload.datasetId}/models/${payload.modelId}`)
    commit('loadModel', response.data)
  }
}
