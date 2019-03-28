import axios from 'axios'
import eventHub from '@/utils/eventHub'

export default function () {
  axios.interceptors.response.use(
    response => {
      return response
    },
    err => {
      eventHub.$emit(eventHub.eventCommunicationError, err)
      return Promise.reject(err)
    }
  )
}
