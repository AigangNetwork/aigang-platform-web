export default function (error) {
  var errorMessage = {
    messageNumber: new Date().getTime().toString(),
    url: window.location.href,
    message: JSON.stringify(error, Object.getOwnPropertyNames(error)),
    userApplicationInfo: navigator.userAgent,
    level: 'error'
  }

  console.error(errorMessage.message)
}
