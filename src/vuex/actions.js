import * as types from './mutation-types'
import router from '@/router'
import { Message } from 'element-ui'
import i18n from '@/i18n'
import axios from 'axios'

const logIn = ({ commit }, token) => {
  // after successful login setup interceptor (save authorization header with token for next requests)
  axios.interceptors.request.use(config => {
    config.headers['Authorization'] = `Bearer ${token}`
    return config
  }, error => {
    return Promise.reject(error)
  })

  // get account profile
  axios.get('/account').then(response => {
    // save token and user profile to store
    commit(types.LOGIN, { token: token, profile: response.data })
    // push to / route
    router.push('/')
    // push success notification
    Message({
      message: i18n.t('notifications.login_success'),
      type: 'success',
      showClose: true
    })
  })
}

export { logIn }
