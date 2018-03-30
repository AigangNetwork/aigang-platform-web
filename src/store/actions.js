import * as types from './mutation-types'
import router from '@/router'
import axios from 'axios'

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
  delete axios.defaults.headers.common['Authorization']
}

const changeProfileNames = ({ commit }, response) => {
  commit(types.CHANGE_PROFILE_NAMES)
}

const setCurrentDataset = ({ commit }, response) => {
  commit(types.SET_CURRENT_DATASET, response.data)
}

const setRemoteFileAccessPoint = ({ commit }, response) => {
  commit(types.SET_REMOTE_FILE_ACCESS_POINT, response)
}

export {
  logIn,
  logOut,
  changeProfileNames,
  setCurrentDataset,
  setRemoteFileAccessPoint
}
