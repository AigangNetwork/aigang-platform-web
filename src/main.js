import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import i18n from '@/i18n'

import store from '@/vuex'

import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import '@/scss/element-aig.scss'

Vue.use(VueAxios, axios)
Vue.use(ElementUI)

Vue.axios.defaults.baseURL = 'http://aigangplatformapi.azurewebsites.net/api'
Vue.config.productionTip = false
Vue.config.lang = 'en'

/* eslint-disable no-new */
new Vue({
  store,
  i18n,
  router,
  el: '.aig__app',
  components: { App },
  template: '<App/>',
  mounted () {
    // setTimeout(() => {
    //   this._i18n.locale = 'ru'
    // }, 4000)
  }
})
