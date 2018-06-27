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

const loadProfileWallets = async ({ commit }, id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const response = [
        {
          date: '2016-05-03T00:00:10Z',
          wallet: '0xb353feb9c0d3c7da87995b174f491e4e7b0beff2'
        }, {
          date: '2016-05-03T00:00:20Z',
          wallet: '0xb353feb9c0d3c7da87995b174f491e4e7b0beff2'
        }, {
          date: '2016-05-03T00:00:30Z',
          wallet: '0xb353feb9c0d3c7da87995b174f491e4e7b0beff2'
        }, {
          date: '2016-05-03T00:00:40Z',
          wallet: '0xb353feb9c0d3c7da87995b174f491e4e7b0beff2'
        }]
      commit(types.LOAD_PROFILE_WALLETS, response)
      resolve()
    }, 1000)
  })
}

const loadProfileTransactions = async ({ commit }, id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const response = [{
        date: '2016-05-03T00:00:10Z',
        transaction: '0xb353feb9c0d3c7da87995b174f491e4e7b0beff2',
        type: 'ForecastAdded',
        status: '2'
      }, {
        date: '2016-05-03T00:00:20Z',
        transaction: '0xb353feb9c0d3c7da87995b174f491e4e7b0beff2',
        type: 'ForecastAdded',
        status: '1'
      }, {
        date: '2016-05-03T00:00:30Z',
        transaction: '0xb353feb9c0d3c7da87995b174f491e4e7b0beff2',
        type: 'ForecastAdded',
        status: '2'
      }, {
        date: '2016-05-03T00:00:40Z',
        transaction: '0xb353feb9c0d3c7da87995b174f491e4e7b0beff2',
        type: 'ForecastAdded',
        status: '0'
      }, {
        date: '2016-05-03T00:00:50Z',
        transaction: '0xb353feb9c0d3c7da87995b174f491e4e7b0beff2',
        type: 'ForecastAdded',
        status: '0'
      }]
      commit(types.LOAD_PROFILE_TRANSACTIONS, response)
      resolve()
    }, 1000)
  })
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

export {
  logIn,
  logOut,
  changeProfileNames,
  loadProfileWallets,
  loadProfileTransactions,
  loadCurrentDataset,
  setRemoteFileAccessPoint,
  setCurrentDatasetFile,
  setIsFileRemote,
  setHasFileChanged,
  registerWeb3Instance,
  clearWeb3Instance,
  loadCurrentModel,
  clearCurrentDataset,
  clearCurrentModel
}
