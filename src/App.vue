<template>
  <div class="aig-app" :class="appClass" v-loading="loading">

    <Navigation/>

    <transition name="slideUp">
      <router-view class="aig-view"></router-view>
    </transition>

    <notification></notification>
  </div>
</template>

<script>
import Navigation from '@/components/navigation/Navigation'
import Notification from '@/components/Notification'

export default {
  name: 'App',
  data () {
    return {
      loading: false
    }
  },
  components: {
    Navigation,
    Notification
  },
  computed: {
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
