<template>
  <div class="aig__app" :class="appClass" v-loading="loading" element-loading-background="rgba(255, 255, 255, 1)" element-loading-text="Mounting application...">
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
    appClass () {
      return {
        'aig--authed': this.$store.getters.isAuthenticated,
        'aig--notAuthed': !this.$store.getters.isAuthenticated
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
@import '~helpers/reset';
@import '~helpers/mixins';
@import '~helpers/variables';
@import '~helpers/transitions';

body.aig {
  font-family: $font-primary;
  overflow-y: scroll;
}

a {
  color: $purple;
}

.aig__breadcrumbs {
  margin-bottom: 40px;
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
  padding-top: 50px;
  @include breakpoint(max-width 768px) {
    padding-top: 70px;
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

.aig__view {
  width: 100%;
  padding-top: 40px;
  padding-bottom: 40px;
  &.aig__view--centered {
    display: flex;
    min-height: 100vh;
    align-items: center;
  }
  .aig__view__head {
    &+.aig__view__body {
      margin-top: 30px;
    }
  }
  .aig__view__title {
    font-size: 32px;
    font-weight: 500;
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
