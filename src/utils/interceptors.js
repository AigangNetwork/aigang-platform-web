import axios from 'axios'
import eventHub from '@/utils/eventHub'
import store from '@/store'

export default function () {
  axios.interceptors.response.use(
    response => {
      if (response.headers['set-authorization']) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${
          response.headers['set-authorization']
        }`
      }
      return response
    },
    function (error) {
      return Promise.reject(error)
    }
  )

  axios.interceptors.response.use(response => {
    if (response.headers['set-authorization']) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${
        response.headers['set-authorization']
      }`
    }
    return response
  }, undefined)

  if (store.getters.isAuthenticated) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${
      store.getters.token
    }`
  }

  axios.interceptors.response.use(undefined, err => {
    eventHub.$emit(eventHub.eventCommunicationError, err)
    return Promise.reject(err)
  })
}
