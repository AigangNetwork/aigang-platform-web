<template>
  <div class="aig__app" :class="appClass" v-loading="loading" >

    <Navigation/>

    <transition name="slideUp">
      <router-view class="aig__view"></router-view>
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
        'aig--authed': this.$store.getters.isAuthenticated,
        'aig--notAuthed': !this.$store.getters.isAuthenticated
      }
    }
  }
}
</script>

<style lang="scss">
@import '~helpers/reset';
@import '~helpers/mixins';
@import '~helpers/variables';
@import '~helpers/transitions';

body.aig {
  display: flex;
  font-family: $font-primary;
  overflow-y: scroll;
}

.aig__app {
  width: 100%;
    @include breakpoint(max-width 768px) {
      // todo: compose menu items
    }
}

.aig__container {
  @include clearfix;
  max-width: 1140px;
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  margin: 0 auto;
}

p {
  line-height: 1.55;
}

.aig__items {
  .el-col {
    padding-top: 10px;
    padding-bottom: 10px;
  }
}

</style>
