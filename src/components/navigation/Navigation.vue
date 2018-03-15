<template>
  <div>
    <transition name="slideDown">
      <div class="aig-navigation">
        <div class="aig-navigation-body">
          <router-link to="/" class="aig-logo">
            <img src="/static/logo.png" alt="">
          </router-link>
          <nav class="aig-navigation-menu">
            <ul>
              <li v-on:click="selectTag(index)" :class="{ 'aig-bar-active': bar.active }" v-for="(bar, index) in navigationBars" :key="bar.name">
                <router-link :to="bar.routeLink" exact>
                  {{ bar.name }}
                </router-link>
              </li>
            </ul>
          </nav>
          <div class="aig-profile-wrapper" v-on:click="selectProfile" v-bind:class="{ 'aig-bar-active' : isProfileActive }" v-if="this.$store.getters.isAuthenticated">
            <Profile />
          </div>
          <el-button type="primary" class="aig--login" @click="selectLogin" v-else>{{ $t('navigation.login')}}</el-button>
          <div v-on:click="dropDownMenuActive = !dropDownMenuActive" class="aig-hamburger-wrapper">
            <hamburger v-bind:menuActive="dropDownMenuActive"></hamburger>
          </div>
        </div>
      </div>
    </transition>
    <div class="aig-dropdown" v-if="dropDownMenuActive">
      <ul>
        <li v-on:click="selectTag(index)" :class="{ 'aig-bar-active': bar.active }" v-for="(bar, index) in navigationBars" :key="bar.name">
          <router-link :to="bar.routeLink" exact="bar.active">
            {{ bar.name }}
          </router-link>
        </li>
        <li v-if="this.$store.getters.isAuthenticated" v-on:click="selectProfile" v-bind:class="{ 'aig-bar-active' : isProfileActive }">
          <router-link :to="'/profile'" exact="isProfileActive">
            {{ $t('navigation.profile') }}
          </router-link>
        </li>
        <li v-bind:class="{ 'aig-bar-active' : isProfileActive }" v-else @click="selectProfile">
          <router-link to="/login">{{ $t('navigation.login')}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Profile from '@/components/Profile'
import Hamburger from './Hamburger'

export default {
  name: 'Navigation',
  components: {
    Profile,
    Hamburger
  },
  data () {
    return {
      navigationBars: [
        { name: this.$t('navigation.data'), routeLink: '/data', active: false },
        { name: this.$t('navigation.predictions'), routeLink: '/predictions', active: false },
        { name: this.$t('navigation.invest'), routeLink: '/invest', active: false },
        { name: this.$t('navigation.insure'), routeLink: '/insure', active: false }
      ],
      isProfileActive: false,
      dropDownMenuActive: false
    }
  },
  methods: {
    selectTag (index) {
      this.clearBars()
      this.isProfileActive = false
      this.navigationBars[index].active = true
    },
    selectProfile () {
      this.clearBars()
      this.isProfileActive = true
    },
    selectLogin () {
      this.clearBars()
      this.$router.push({ name: 'Login' })
    },
    clearBars () {
      this.navigationBars.forEach(function (val, key) {
        val.active = false
      })
      if (this.dropDownMenuActive) {
        this.dropDownMenuActive = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~helpers/variables';
  @import '~helpers/mixins';

  .aig-dropdown {
    font-family: $font-primary;
    position: absolute;
    width: 100%;
    z-index: 22;
    background-color: $purple;
    line-height: 3em;
    ul {
      list-style-type: none;
      li {
        a {
          color: $white;
          padding: 10px;
          display: block;
        }
      }
    }
    @include breakpoint(min-width 780px) {
      display: none;
    }
  }

  .aig-hamburger-wrapper {
    display: none;
  }

  .aig-profile-wrapper {
    width: 200px;
    line-height: 1.4;
  }

  .aig-bar-active {
    background-color: $active-dark-purple;
    border-bottom: solid 5px;
    border-bottom-color: $orange;
  }

  .aig-logo {
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

  .aig-navigation {
    margin: 0 auto;
    max-width: 1440px;
    width: 100%;
    line-height: 50px;
    .aig-navigation-body {
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

      @include breakpoint(max-width 780px) {
        .aig-hamburger-wrapper {
          display: block;
        }
        .aig-navigation-menu ul {
          display: none;
        }
        .aig-profile-wrapper {
          display: none;
        }
        .aig--login {
          display: none;
        }
      }
    }
    .aig-logo {
      &:hover {
        opacity: 0.65;
      }
      &:active {
        opacity: 1;
      }
    }
  }

  .aig-navigation-menu {
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
    @include breakpoint(max-width 780px) {
      ul {
        background: white;
      }
    }
  }
</style>