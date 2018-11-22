<template>
  <div v-if="show" class="cookies-bar">
    <div class="cookies-bar-container">
      <span class="cookies-message">
        {{ $t('general.cookiesMessage') }}
        <router-link class="bold" :to="{ name: 'CookiesPolicy' }"> {{ $t('general.readMoreCookies') }} </router-link>
      </span>
      <div class="cookies-bar-buttons">
        <el-button class="button" @click="removeTracking">{{ $t('general.decline') }}</el-button>
        <el-button type="primary" @click="addTracking" class="button">{{ $t('general.accept') }}</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      show: true,
      showDialog: false
    }
  },
  methods: {
    ...mapMutations({
      setIsCookiesEnabled: 'setIsCookiesEnabled'
    }),
    removeTracking () {
      this.setIsCookiesEnabled(false)
      this.show = false
    },
    addTracking () {
      this.setIsCookiesEnabled(true)
      this.loadGoogleAnalytics()
      this.show = false
    },
    loadGoogleAnalytics () {
      ;(function (w, d, s, l, i) {
        w[l] = w[l] || []
        w[l].push({
          'gtm.start': new Date().getTime(),
          event: 'gtm.js'
        })
        let f = d.getElementsByTagName(s)[0]
        let j = d.createElement(s)
        let dl = l !== 'dataLayer' ? '&l=' + l : ''
        j.async = true
        j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
        f.parentNode.insertBefore(j, f)
      })(window, document, 'script', 'dataLayer', 'GTM-KGKXNP7')
    }
  },
  mounted () {
    if (this.$store.state.isCookiesEnabled === null) {
      this.show = true
    } else if (this.$store.state.isCookiesEnabled === true) {
      this.loadGoogleAnalytics()
      this.show = false
    } else {
      this.show = false
    }
  }
}
</script>
<style lang="scss" scoped>
  .cookies-bar {
    padding: 20px;
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 100px;
    box-shadow: 0 0 30px 0 #e9f0f6;
    background-color: rgba(255, 255, 255, 0.9);
    align-items: center;
    justify-content: center;

    .cookies-bar-container {
      display: flex;
      flex-direction: row;
    }
  }

  .cookies-message {
    margin-right: 20px;
    line-height: 48px;
  }

  @media screen and (max-width: 1200px) and (min-width: 100px) {
    .cookies-bar {
      height: 170px;
      z-index: 9999;

      .cookies-bar-container {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 100%;
      }

      .cookies-message {
        margin-right: 0;
        line-height: initial;
        margin-bottom: 15px;
        margin-top: 15px;
      }
    }
  }
</style>
