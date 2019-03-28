<template>
  <div class="aig-app aig--notAuthed" v-loading="loading">
    <WrongNetworkDialog :isVisible="showWrongNetworkDialog" :displayDialog="displayWrongNetworkDialog" />
    <Navigation />
    <transition name="slideUp">
      <router-view class="aig-view"></router-view>
    </transition>
    <CookiesBar />
    <notification></notification>
    <InsufficientBalanceDialog :showDialog="isInsufficientBalanceDialogVisible" @onButtonClick="onInsufficientBalanceDialogClose"/>
  </div>
</template>

<script>
import Navigation from '@/components/navigation/Navigation'
import Notification from '@/components/Notification'
import CookiesBar from '@/components/CookiesBar'
import InsufficientBalanceDialog from '@/components/InsufficientBalanceDialog'
import WrongNetworkDialog from '@/components/WrongNetworkDialog'

export default {
  name: 'App',
  data () {
    return {
      loading: false,
      isWrongNetwork: true
    }
  },
  components: {
    Navigation,
    Notification,
    CookiesBar,
    InsufficientBalanceDialog,
    WrongNetworkDialog
  },
  methods: {
    onInsufficientBalanceDialogClose () {
      this.$store.dispatch('showInsufficientBalanceDialog', false)
    },
    displayWrongNetworkDialog (value) {
      this.$store.commit('setShowEthNetworkError', value)
    }
  },
  computed: {
    isInsufficientBalanceDialogVisible () {
      return this.$store.getters['insufficientBalanceDialogVisible']
    },
    showWrongNetworkDialog () {
      return this.$store.state.showEthNetworkError
    }
  },
  async beforeMount () {
    await this.$store.dispatch('resetRootState')
    await this.$store.dispatch('user/registerWeb3')
  }
}

</script>
