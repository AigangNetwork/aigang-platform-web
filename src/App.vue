<template>
  <div class="aig__app">
    <Navigation></Navigation>
    <router-view class="aig__view"/>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'

export default {
  name: 'App',
  components: {
    Navigation
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Open+Sans|Poppins');

@import '~helpers/reset';
@import '~helpers/variables';

.aig__app {
  font-family: $font-primary;
  overflow: hidden;
  width: 100%;
  min-height: 100vh;
  font-size: 15px;
  line-height: 1;
  display: flex;
  align-items: column;
}

.aig__view {
  min-height: 100vh;
  width: 100%;
  padding: 60px;
  .aig__view__head {
    &+.aig__view__body {
      margin-top: 40px;
    }
  }
  .aig__view__title {
    font-size: 36px;
    font-weight: 700;
    font-family: $font-secondary;
  }
}

p {
  line-height: 1.55;
}
</style>
