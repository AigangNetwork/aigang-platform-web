<template>
  <div class="aig__app" :class="authenticatedClass" v-loading="loading" element-loading-background="rgba(255, 255, 255, 1)" element-loading-text="Mounting application...">
    <Navigation/>
    <transition name="fade">
      <router-view class="aig__view"></router-view>
    </transition>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'

export default {
  name: 'App',
  data () {
    return {
      loading: false
    }
  },
  components: {
    Navigation
  },
  computed: {
    authenticatedClass () {
      return {
        'aig__app--authed': this.$store.getters.isAuthenticated
      }
    }
  },
  mounted () {
    // setTimeout(() => {
    //   this.loading = false
    //   this.$message({
    //     message: 'Application successfully mounted',
    //     type: 'success',
    //     showClose: true
    //   })
    // }, 1000)
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Saira+Semi+Condensed:300,400,500,600|Ubuntu:300,300i,400,400i,500,500i,700,700i');

@import '~helpers/reset';
@import '~helpers/variables';
@import '~helpers/transitions';

body.aig {
  font-family: $font-primary;
  overflow-y: scroll;
}

.aig__app {
  padding-top: 0;
  font-size: 13px;
  background: #f9f9fb;
  font-family: $font-primary;
  width: 100%;
  font-size: 14px;
  align-items: column;
  line-height: 1;
  min-height: 100%;
  &.aig__app--authed {
    padding-top: 50px;
  }
}

.aig__container {
  max-width: 1140px;
  width: 100%;
  padding: 0 20px;
  margin: 0 auto;
}

.aig__view {
  width: 100%;
  &.aig__view--centered {
    display: flex;
    min-height: 100vh;
    align-items: center;
  }
  .aig__view__body {
    padding-top: 40px;
    padding-bottom: 40px;
  }
  .aig__view__title {
    font-size: 32px;
    font-weight: 300;
    font-family: $font-secondary;
  }
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
