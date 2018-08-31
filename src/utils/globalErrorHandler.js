import axios from 'axios'

export default function (error, vm, info) {
  var errorMessage = {
    messageNumber: new Date().getTime().toString(),
    message: JSON.stringify(error, Object.getOwnPropertyNames(error)),
    userApplicationInfo: navigator.userAgent,
    level: 'error'
  }

  if (process.env.NODE_ENV !== 'production' || process.env.NODE_ENV !== 'qa') {
    console.error(errorMessage)
  } else {
    console.log(`Error message number: ${errorMessage.messageNumber}`)
    axios.post('log', errorMessage)
  }
}
