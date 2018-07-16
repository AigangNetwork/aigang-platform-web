import * as types from './mutation-types'
import router from '@/router'
import axios from 'axios'
import getWeb3 from '@/utils/web3/getWeb3'

const logIn = ({ commit }, loginResponse) => {
  // after successful login setup interceptor (save authorization header with token for next requests)
  // axios.defaults.headers.common['Authorization'] = `Bearer ${loginResponse.headers['set-authorization']}`
  // axios.interceptors.request.use(config => {
  //   config.headers['Authorization'] = `Bearer ${loginResponse.headers['set-authorization']}`
  //   return config
  // }, error => {
  //   return Promise.reject(error)
  // })

  commit(types.LOGIN, loginResponse.data)
  getWeb3()
    .then(result => {
      commit(types.SET_WEB3_INSTANCE, result)
    })
    .catch(e => {})
  router.push('/')
  // get account profile
  // axios.get('/account').then(response => {
  //   // save token and user profile to store
  //   commit(types.LOGIN, loginResponse.data)
  //   // push to / route
  //   router.push('/')
  // })
}

const logOut = ({ commit }) => {
  commit(types.LOGOUT)
  commit(types.CLEAR_WEB3_INSTANCE)
  delete axios.defaults.headers.common['Authorization']
}

const changeProfileNames = ({ commit }, response) => {
  commit(types.CHANGE_PROFILE_NAMES, response)
}

const loadCurrentDataset = async ({ commit, state }, id) => {
  const response = await axios.get('/data/' + id)
  if (response.data.data) {
    commit(types.LOAD_CURRENT_DATASET, response.data)
  } else {
    commit(types.CLEAR_CURRENT_DATASET)
  }
}

const clearCurrentDataset = ({ commit }) => {
  commit(types.CLEAR_CURRENT_DATASET)
}

const clearCurrentModel = ({ commit }) => {
  commit(types.CLEAR_CURRENT_MODEL)
}

const setRemoteFileAccessPoint = ({ commit }, response) => {
  commit(types.SET_REMOTE_FILE_ACCESS_POINT, response)
}

const setCurrentDatasetFile = ({ commit }, response) => {
  commit(types.SET_CURRENT_DATASET_FILE, response)
}

const setIsFileRemote = ({ commit }, response) => {
  commit(types.SET_IS_FILE_REMOTE, response)
}

const setHasFileChanged = ({ commit }, response) => {
  commit(types.SET_HAS_FILE_CHANGED, response)
}

const registerWeb3Instance = ({ commit }, response) => {
  getWeb3()
    .then(result => {
      commit(types.SET_WEB3_INSTANCE, result)
    })
    .catch(e => {})
}

const clearWeb3Instance = ({ commit }, response) => {
  commit(types.CLEAR_WEB3_INSTANCE, response)
}

const loadCurrentModel = async ({ commit, state }, payload) => {
  const response = await axios.get(`/data/${payload.datasetId}/models/${payload.modelId}`)
  commit(types.LOAD_CURRENT_MODEL, response.data)
}

const loadCurrentProduct = async ({ commit }, id) => {
  commit(types.CLEAR_CURRENT_PRODUCT)
  commit(types.LOADING, { loading: true })

  let response = null

  try {
    response = await axios.get('insurance/products/' + id)
  } catch (e) {
    commit(types.LOADING, { loading: false })
  }

  if (response && response.data.product) {
    commit(types.LOAD_CURRENT_PRODUCT, response.data)
    commit(types.LOADING, { loading: false })
  } else {
    commit(types.CLEAR_CURRENT_PRODUCT)
    commit(types.LOADING, { loading: false })
  }
}

const createNewPolicy = async ({ commit }, imei) => {
  commit(types.CLEAR_CURRENT_POLICY)
  commit(types.LOADING, { loading: true })

  let response = null

  try {
    response = await axios.post('insurance/policy-draft/' + imei)
  } catch (e) {
    commit(types.LOADING, { loading: false })
  }

  if (response && response.data.policy) {
    commit(types.LOAD_CURRENT_POLICY, response.data)
    commit(types.LOADING, { loading: false })
  } else {
    commit(types.CLEAR_CURRENT_POLICY)
    commit(types.LOADING, { loading: false })
  }
}

const loadUserPolicies = async ({commit}, page) => {
  const response = await axios.get('/insurance/policy/mypolicies?page=' + page)
  if (response.data) {
    commit(types.LOAD_USER_POLICIES, response.data)
  }
}

export {
  logIn,
  logOut,
  changeProfileNames,
  loadCurrentDataset,
  setRemoteFileAccessPoint,
  setCurrentDatasetFile,
  setIsFileRemote,
  setHasFileChanged,
  registerWeb3Instance,
  clearWeb3Instance,
  loadCurrentModel,
  clearCurrentDataset,
  clearCurrentModel,
  loadCurrentProduct,
  createNewPolicy,
  loadUserPolicies
}
