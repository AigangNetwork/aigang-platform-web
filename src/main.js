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
import interceptors from '@/utils/interceptors'

import 'element-ui/lib/theme-chalk/index.css'
import '@/scss/element.scss'
import '@/scss/general.scss'
import '@/scss/aigang.scss'
import '@/scss/aigang-mobile.scss'
import '@/scss/aigang-tablet.scss'

Vue.config.errorHandler = errorHandler

Vue.use(VueAxios, axios)
Vue.use(ElementUI)
Vue.use(VueMoment)

Vue.axios.defaults.baseURL = process.env.API_ADDRESS
interceptors()

Vue.filter('truncate', function (text, stop, clamp) {
  return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
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
  el: '.aig-app',
  components: { App },
  template: '<App/>',
  mounted () {
    this.$nextTick(() => {
      this.$i18n.locale = 'en'
      this.$moment.locale('en')
      loaderInstance.close()
    })
  }
})
