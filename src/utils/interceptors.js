import axios from 'axios'
import eventHub from '@/utils/eventHub'
import store from '@/store'
import * as types from '../store/mutation-types'

export default function () {
  if (store.getters.isAuthenticated) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${store.getters.token}`
  }

  axios.interceptors.response.use(
    response => {
      if (response.headers['set-authorization']) {
        store.commit(types.SET_AUTH_TOKEN, response.headers['set-authorization'])
        axios.defaults.headers.common['Authorization'] = `Bearer ${store.getters.token}`
      } else if (store.getters.isAuthenticated) {
        axios.defaults.headers.common['Authorization'] = ``
        store.commit(types.LOGOUT)
      }

      return response
    },
    err => {
      eventHub.$emit(eventHub.eventCommunicationError, err)
      return Promise.reject(err)
    }
  )
}
