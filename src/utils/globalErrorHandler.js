import axios from 'axios'

export default function (error, vm, info) {
  var errorMessage = {
    messageNumber: new Date().getTime().toString(),
    message: JSON.stringify(error, Object.getOwnPropertyNames(error)),
    userApplicationInfo: navigator.userAgent,
    level: 'error'
  }
  console.log(`Error message number: ${errorMessage.messageNumber}`)
  axios.post('log', errorMessage)
}
