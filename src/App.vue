<template>
  <div class="aig__app">
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
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Saira+Semi+Condensed:300,400,500,600|Ubuntu:300,300i,400,400i,500,500i,700,700i');

@import '~helpers/reset';
@import '~helpers/variables';

.aig__app {
  padding-left: 250px;
  font-size: 13px;
  background: $gray;
  position: relative;
  font-family: $font-primary;
  width: 100%;
  font-size: 14px;
  line-height: 1;
  display: flex;
  align-items: column;
  .aig__navigation {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
}

.aig__view {
  width: 100%;
  min-height: 100vh;
  height: auto;
  padding: 60px;
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
