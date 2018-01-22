import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/scss/element-aig.scss'
import i18n from '@/i18n'
import VueParticles from 'vue-particles'

Vue.use(ElementUI)
Vue.use(VueParticles)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  i18n,
  el: '.aig__app',
  router,
  components: { App },
  template: '<App/>',
  mounted () {
    Vue.config.lang = 'ja'
  }
})
