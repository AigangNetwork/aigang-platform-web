<template>
  <div class="aig__app" :class="appClass" v-loading="loading" element-loading-background="rgba(255, 255, 255, 1)" element-loading-text="Mounting application...">
    <Navigation/>
    <transition name="slideUp">
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
  display: flex;
  font-family: $font-primary;
  overflow-y: scroll;
}

a {
  color: $purple;
}

.aig__breadcrumbs {
  margin-bottom: 40px;
}

.aig__sidemenu {
  position: relative;
  width: 100%;
  padding: 20px 30px 0 30px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid darken($gray, 2);
  .aig__sidemenu__group {
    .head {
      .title {
        font-weight: 500;
        font-size: 16px;
        font-family: $font-secondary;
      }
      &+.body {
        margin-top: 20px;
      }
    }
    .body {
      .menu {
        padding: 0;
        margin: 0;
        list-style: none;
        li {
          margin: 0 -30px;
          a {
            @include transition(color, 100ms, ease-in-out);
            line-height: 24px;
            font-size: 13px;
            display: block;
            color: darken($gray, 50);
            padding: 8px 30px;
            position: relative;
            font-weight: 500;
            &:before {
              @include transition;
              position: absolute;
              top: 0;
              left: -2px;
              background: $purple;
              background: linear-gradient(45deg, #5833b7 0%, #9549c8 100%);
              content: '';
              height: 100%;
              width: 2px;
              opacity: 0;
            }
            &:hover {
              background: darken(white, 2);
              color: darken($gray, 75);
            }
            &.router-link-active {
              color: $purple;
              background: darken(white, 3);
              &:before {
                opacity: 1;
              }
            }
          }
        }
      }
    }
  }
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
      margin-top: 40px;
    }
  }
  .aig__view__title {
    font-size: 32px;
    font-weight: 400;
    font-family: $font-secondary;
    &.aig__view__title--small {
      font-size: 24px;
    }
  }
  .aig__view__description {
    color: darken($gray, 50);
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
