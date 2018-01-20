<template>
  <div class="aig__app" v-loading="loading" element-loading-background="rgba(255, 255, 255, 1)" element-loading-text="Mounting application...">
    <Navigation/>
    <router-view class="aig__view"/>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'

export default {
  name: 'App',
  components: {
    Navigation
  },
  data () {
    return {
      loading: true
    }
  },
  mounted () {
    setTimeout(() => {
      this.loading = false
      this.$message({
        message: 'Application successfully mounted',
        type: 'success'
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
}

.aig__app {
  font-size: 13px;
  background: $gray;
  position: relative;
  font-family: $font-primary;
  width: 100%;
  padding-top: 50px;
  min-height: 100%;
  font-size: 14px;
  display: flex;
  align-items: column;
  line-height: 1;
  .aig__navigation {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
}

.aig__container {
  max-width: 1140px;
  padding: 0 20px;
  margin: 0 auto;
  width: 100%;
  align-items: center;
  width: 100%;
}

.aig__view {
  padding-top: 40px;
  padding-bottom: 40px;
  width: 100%;
  min-height: 100%;
  @extend .aig__container;
  .aig__view__head {
    &+.aig__view__body {
      margin-top: 40px;
    }
  }
  .aig__view__title {
    font-size: 28px;
    font-weight: 500;
    font-family: $font-secondary;
  }
}

p {
  line-height: 1.55;
}
</style>
