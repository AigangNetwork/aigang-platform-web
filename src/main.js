import Vue from 'vue'
import App from '@/App'
import router from '@/router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/scss/element-aig.scss'

Vue.use(ElementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '.aig__app',
  router,
  components: { App },
  template: '<App/>'
})
