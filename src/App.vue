<template>
  <div class="aig__app" v-loading="loading" element-loading-background="rgba(255, 255, 255, 1)" element-loading-text="Mounting application...">
    <Navigation />
    <el-alert
      title="AiGang Web Platform running in pre-alpha version"
      type="info"
      center>
    </el-alert>
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
      loading: true
    }
  },
  components: {
    Navigation
  },
  mounted () {
    setTimeout(() => {
      this.loading = false
      this.$message({
        message: 'Application successfully mounted',
        type: 'success',
        showClose: true
      })
    }, 1000)
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Saira+Semi+Condensed:300,400,500,600|Ubuntu:300,300i,400,400i,500,500i,700,700i');

@import '~helpers/reset';
@import '~helpers/variables';

body.aig {
  font-family: $font-primary;
  overflow-y: scroll;
}

.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: 150ms;
}

.fade-enter-active {
  transition-delay: 150ms;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}

.aig__app {
  padding-top: 50px;
  font-size: 13px;
  background: #f9f9fb;
  font-family: $font-primary;
  width: 100%;
  font-size: 14px;
  align-items: column;
  line-height: 1;
  min-height: 100%;
}

.aig__container {
  max-width: 1140px;
  width: 100%;
  padding: 0 20px;
  margin: 0 auto;
}

.aig__view {
  width: 100%;
  min-height: 100%;
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
