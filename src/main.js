import Vue from 'vue'
import App from '@/App'
import router from '@/router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/scss/element-aig.scss'
import i18n from '@/i18n'
import VueParticles from 'vue-particles'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

Vue.axios.defaults.baseURL = 'http://aigangplatformapi.azurewebsites.net/api'

Vue.use(ElementUI)
Vue.use(VueParticles)

Vue.config.productionTip = false
Vue.config.lang = 'en'

/* eslint-disable no-new */
new Vue({
  i18n,
  el: '.aig__app',
  router,
  components: { App },
  template: '<App/>'
})
