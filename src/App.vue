<template>
  <div class="aig-app" :class="appClass" v-loading="loading">
    <Navigation />
    <transition name="slideUp">
      <router-view class="aig-view"></router-view>
    </transition>
    <CookiesBar />
    <notification></notification>

    <InsufficientBalanceDialog :showDialog="isInsufficientBalanceDialogVisible" @onButtonClick="onDialogClose"/>
  </div>
</template>

<script>
import Navigation from '@/components/navigation/Navigation'
import Notification from '@/components/Notification'
import CookiesBar from '@/components/CookiesBar'
import InsufficientBalanceDialog from '@/components/InsufficientBalanceDialog'

export default {
  name: 'App',
  data () {
    return {
      loading: false
    }
  },
  components: {
    Navigation,
    Notification,
    CookiesBar,
    InsufficientBalanceDialog
  },
  methods: {
    onDialogClose () {
      this.$store.dispatch('showInsufficientBalanceDialog', false)
    }
  },
  computed: {
    isInsufficientBalanceDialogVisible () {
      return this.$store.getters['insufficientBalanceDialogVisible']
    },
    appClass () {
      return {
        'aig--authed': this.$store.getters['user/isAuthenticated'],
        'aig--notAuthed': !this.$store.getters['user/isAuthenticated']
      }
    }
  },
  async mounted () {
    if (this.$store.getters['user/isAuthenticated']) {
      await this.$store.dispatch('user/clearWeb3Instance')
      this.$store.dispatch('user/registerWeb3Instance')
    }
  }
}

</script>
