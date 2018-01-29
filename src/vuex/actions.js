import * as types from './mutation-types'
import router from '@/router'
import { Message } from 'element-ui'
import i18n from '@/i18n'

const logIn = ({ commit }, token) => {
  commit(types.LOGIN, token)
  Message({
    message: i18n.t('notifications.login_success'),
    type: 'success',
    showClose: true
  })
  router.push('/')
}

export { logIn }
