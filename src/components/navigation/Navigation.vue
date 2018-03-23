<template>
  <div>
    <transition name="slideDown">
      <div class="aig-navigation">
        <div class="aig-navigation-body">
          <router-link to="/" class="aig-logo" @click.native="activateHomeBar">
            <img src="/static/logo.png" alt="">
          </router-link>
          <nav class="aig-navigation-menu">
            <ul>
              <li v-on:click="selectTag(index)" :class="{ 'aig-bar-active': bar.active }" v-for="(bar, index) in navigationBars" :key="bar.name">
                <router-link :class="{'disabled': bar.disabled}" :to="bar.routeLink" exact>
                  {{ bar.name }}
                </router-link>
              </li>
            </ul>
          </nav>
          <div class="aig-profile-wrapper" v-on:click="selectProfile" v-bind:class="{ 'aig-bar-active' : isProfileActive }" v-if="this.$store.getters.isAuthenticated">
            <UserTab />
          </div>
          <el-button type="primary" class="aig--login" @click="selectLogin" v-else>{{ $t('navigation.login')}}</el-button>
          <div v-on:click="dropDownMenuActive = !dropDownMenuActive" class="aig-hamburger-wrapper">
            <hamburger v-bind:menuActive="dropDownMenuActive"></hamburger>
          </div>
        </div>
      </div>
    </transition>
    <<<<<<< HEAD <transition name="slideDown">
      <div class="aig-dropdown" v-if="dropDownMenuActive">
        <ul>
          <li v-on:click="selectTag(index)" :class="{ 'aig-bar-active': bar.active }" v-for="(bar, index) in navigationBars" :key="bar.name">
            <router-link :to="bar.routeLink" exact>
              {{ bar.name }}
            </router-link>
          </li>
          <li v-if="this.$store.getters.isAuthenticated" v-on:click="selectProfile" v-bind:class="{ 'aig-bar-active' : isProfileActive }">
            <router-link :to="'/profile'" exact>
              {{ $t('navigation.profile') }}
            </router-link>
          </li>
          <li v-bind:class="{ 'aig-bar-active' : isProfileActive }" v-else @click="selectProfile">
            <router-link to="/login">{{ $t('navigation.login')}}</router-link>
          </li>
        </ul>
      </div>
      </transition>
      =======
      <transition name="slideDown">
        <div class="aig-dropdown" v-if="dropDownMenuActive">
          <ul>
            <li v-on:click="selectTag(index)" v-for="(bar, index) in navigationBars" :key="bar.name">
              <router-link :class="[{ 'aig-bar-active': bar.active }, {'disabled': bar.disabled}]" :to="bar.routeLink" exact>
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
      </transition>
      >>>>>>> c5e6207984e9d7354b8f0aca53cb8ec94003c643
  </div>
</template>
<script>
  import UserTab from '@/components/UserTab'
  import Hamburger from './Hamburger'

  export default {
    name: 'Navigation',
    components: {
      UserTab,
      Hamburger
    },
    data() {
      return {
<<<<<<< HEAD
        navigationBars: [
          { name: this.$t('navigation.data'), routeLink: '/data', active: true },
          { name: this.$t('navigation.predictions'), routeLink: '/predictions', active: false },
          { name: this.$t('navigation.invest'), routeLink: '/invest', active: false },
          { name: this.$t('navigation.insure'), routeLink: '/insure', active: false }
=======
      navigationBars: [{
        name: this.$t('navigation.data'),
        routeLink: '/data',
        active: false,
        disabled: false
      },
      {
        name: this.$t('navigation.predictions'),
        routeLink: '/predictions',
        active: false,
        disabled: true
      },
      {
        name: this.$t('navigation.invest'),
        routeLink: '/invest',
        active: false,
        disabled: true
      },
      {
        name: this.$t('navigation.insure'),
        routeLink: '/insure',
        active: false,
        disabled: true
      }
>>>>>>> c5e6207984e9d7354b8f0aca53cb8ec94003c643
        ],
        homeRoute: '/data',
        isProfileActive: false,
        dropDownMenuActive: false
      }
    },
    methods: {
      selectTag(index) {
        if (this.navigationBars[index].disabled) {
          return
        }
        this.clearBars()
        this.isProfileActive = false
        this.navigationBars[index].active = true
      },
      selectProfile() {
        this.clearBars()
        this.isProfileActive = true
      },
      selectLogin() {
        this.clearBars()
        this.$router.push({
          name: 'Login'
        })
      },
      clearBars() {
        this.navigationBars.forEach(function (val, key) {
          val.active = false
        })
        if (this.dropDownMenuActive) {
          this.dropDownMenuActive = false
        }
      },
      activateHomeBar() {
        this.clearBars()
        this.isProfileActive = false
        let bars = this.navigationBars.filter(
          (bar) => bar.routeLink === this.homeRoute)
        bars[0].active = true
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
      padding-left: 0;
      li {
        width: 100%;
        padding-left: 40px;
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
    width: 100%;
    line-height: 50px;
    background: $purple;
    width: 100%;
    .aig-navigation-body {
      @include clearfix;
      margin: 0 auto;
      max-width: 1440px;
      font-size: 0;
      background: $purple;
      height: 70px;
      display: flex;
      .aig--login {
        height: 40px;
        margin-top: 13px;
        margin-right: 15px;
      }

      .disabled {
        pointer-events: none;
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
        list-style: none;
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
