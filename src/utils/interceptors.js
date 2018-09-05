import axios from 'axios'
import eventHub from '@/utils/eventHub'
import store from '@/store'

export default function () {
  if (store.getters['user/isAuthenticated']) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${store.getters['user/token']}`
  }

  axios.interceptors.response.use(
    response => {
      if (response.headers['set-authorization']) {
        store.commit('user/SET_AUTH_TOKEN', response.headers['set-authorization'])
        axios.defaults.headers.common['Authorization'] = `Bearer ${store.getters['user/token']}`
      }

      return response
    },
    err => {
      eventHub.$emit(eventHub.eventCommunicationError, err)
      return Promise.reject(err)
    }
  )
}
