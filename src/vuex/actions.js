import * as types from './mutation-types'
import router from '@/router'

const logIn = ({ commit }, token) => {
  commit(types.LOGIN, token)
  router.push('/')
}

export { logIn }
