import * as types from './mutation-types'
import router from '@/router'
import axios from 'axios'

const logIn = ({ commit }, user) => {
  // after successful login setup interceptor (save authorization header with token for next requests)
  axios.interceptors.request.use(config => {
    config.headers['Authorization'] = `Bearer ${user.token}`
    return config
  }, error => {
    return Promise.reject(error)
  })

  // get account profile
  axios.get('/account').then(response => {
    // save token and user profile to store
    commit(types.LOGIN, user)
    // push to / route
    router.push('/')
  })
}

export { logIn }
