<template>
  <transition name="slideDown">
    <div class="aig__navigation">
      <div class="aig__navigation__body">
          <router-link to="/" class="aig__logo" exact>
            <img src="/static/logo.png" alt="">
          </router-link>
          <nav class="aig__navigation__menu">
            <ul>
              <li v-on:click="selectTag(index)" :class="{ aig__bar__active: bar.active }" v-for="(bar, index) in navigationBars" :key="bar.name">
                <router-link :to="bar.routeLink">
                   {{ bar.name }}
                </router-link>
              </li>
            </ul>
          </nav>
          <div class="aig__profile__wrapper" v-on:click="selectProfile" v-bind:class="{ aig__bar__active : isProfileActive }" v-if="this.$store.getters.isAuthenticated">
            <Profile />
          </div>
            <el-button type="primary" class="aig--login" @click="$router.push({ name: 'Login' })" v-else>{{ $t('navigation.login')}}</el-button>
      </div>
    </div>
  </transition>
</template>
<script>
import Profile from '@/components/Profile'

export default {
  name: 'Navigation',
  components: {
    Profile
  },
  data () {
    return {
      navigationBars: [
        { name: this.$t('navigation.data'), routeLink: '/data', active: true },
        { name: this.$t('navigation.predictions'), routeLink: '/predictions', active: false },
        { name: this.$t('navigation.invest'), routeLink: '/invest', active: false },
        { name: this.$t('navigation.insure'), routeLink: '/insure', active: false }
      ],
      isProfileActive: false
    }
  },
  methods: {
    selectTag (index) {
      this.navigationBars.forEach(function (val, key) {
        val.active = false
      })
      this.isProfileActive = false
      this.navigationBars[index].active = true
    },
    selectProfile () {
      this.navigationBars.forEach(function (val, key) {
        val.active = false
      })
      this.isProfileActive = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~helpers/variables';
@import '~helpers/mixins';

.aig__profile__wrapper {
  width: 200px;
  line-height: 1.4;
}
.aig__bar__active {
  background-color: $active-dark-purple;
  border-bottom: solid 5px;
  border-bottom-color: $orange;
}

.aig__logo {
  float: left;
  font-size: 0;
  height: 100%;
  padding: 10px;
  margin-left: 15px;
  img {
    vertical-align: middle;
    height: 30px;
  }
}

.aig__navigation {
  margin: 0 auto;
  max-width: 1520px;
  width: 100%;
  line-height: 50px;
  .aig__navigation__body {
    @include clearfix;
    font-size: 0;
    background: $purple;
    height: 70px;
    display: flex;
    .aig--login {
      height: 40px;
      margin-top: 13px;
      margin-right: 15px;
    }
  }
  .aig__logo {
    &:hover {
      opacity: 0.65;
    }
    &:active {
      opacity: 1;
    }
  }
  @include breakpoint(max-width 768px) {
    .aig__navigation__body {
      line-height: 40px;
      height: auto;
    }
    .aig__profile {
      height: 40px;
    }
  }
}

.aig__navigation__menu {
  width: 100%;
  ul {
    display: flex;
    height: 100%;
    justify-content: center;
    li {
      &+li {
        margin-left: 25px;
      }
      a {
        padding: 15px;
        @include transition(all, 100ms, ease-in-out);
        font-family: $font-primary;
        display: flex;
        align-items: center;
        height: 100%;
        color: $white;
        font-size: 12px;
        font-weight: 500;
        letter-spacing: 2px;
        &:hover {
          color: rgba($white, .65);
        }
      }
    }
  }
  @include breakpoint(max-width 768px) {
    float: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    // z-index: 1;
    background: white;
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.06);
    border-bottom: 1px solid #edf0f3;
    line-height: 40px;
    ul {
      line-height: 30px;
      padding: 0 10px;
      li {
        &+li {
          margin-left: 0;
        }
        a {
          padding: 0 10px;
          letter-spacing: 0;
          font-size: 13px;
          height: auto;
          color: $purple;
          &:hover {
            color: darken($gray, 50);
          }
        }
      }
    }
  }
}
</style>
