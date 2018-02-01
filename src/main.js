import Vue from 'vue'

import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'

import VueMoment from 'vue-moment'
import 'moment/locale/ru'

import App from '@/App'
import i18n from '@/i18n'
import store from '@/vuex'
import router from '@/router'

import 'element-ui/lib/theme-chalk/index.css'
import '@/scss/element-aig.scss'

Vue.use(VueAxios, axios)
Vue.use(ElementUI)
Vue.use(VueMoment)

Vue.axios.defaults.baseURL = 'http://aigangplatformapi.azurewebsites.net/api'
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
    this.$nextTick(() => {
      this.$i18n.locale = 'en'
      this.$moment.locale('en')
      loaderInstance.close()
    })
  }
})
