import errorHandler from './utils/globalErrorHandler'
import Vue from 'vue'

import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'

import VueMoment from 'vue-moment'
import 'moment/locale/ru'

import App from '@/App'
import i18n from '@/lang'
import store from '@/store'
import router from '@/router'
import eventHub from './utils/eventHub'

import 'element-ui/lib/theme-chalk/index.css'
import '@/scss/element.scss'
import '@/scss/general.scss'

Vue.config.errorHandler = errorHandler

Vue.use(VueAxios, axios)
Vue.use(ElementUI)
Vue.use(VueMoment)

Vue.axios.defaults.baseURL = 'http://test.api.aigang.network/api'
// Vue.axios.defaults.baseURL = 'http://localhost:5000/api'

// todo: extract to separate module
axios.interceptors.response.use(response => {
  if (response.headers['set-authorization']) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.headers['set-authorization']}`
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  if (response.headers['set-authorization']) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.headers['set-authorization']}`
  }
  return response
}, undefined)

if (store.getters.isAuthenticated) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${store.getters.token}`
}

axios.interceptors.response.use(undefined, err => {
  eventHub.$emit(eventHub.eventCommunicationError, err)
  return Promise.reject(err)
})

Vue.config.productionTip = false
Vue.config.lang = 'en'

let loaderInstance = ElementUI.Loading.service({
  fullscreen: true,
  text: 'Initializing application'
})

/* eslint-disable no-new */
new Vue({
  store,
  i18n,
  router,
  el: '.aig__app',
  components: { App },
  template: '<App/>',
  mounted () {
    // if (this.$store.getters.isAuthenticated) {
    //   axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.getters.token}`
    // }

    this.$nextTick(() => {
      this.$i18n.locale = 'en'
      this.$moment.locale('en')
      loaderInstance.close()
    })
  }
})
