<template>
  <div>
    <transition name="slideDown">
      <div class="aig-navigation">
        <div class="aig-navigation-body">
          <router-link to="/insurance/products" class="aig-logo">
            <img src="/static/logo.png" alt="">
            <div class="alpha-container" v-if="isDevEnv">
              {{ $t('general.testPlatform') }}
            </div>
          </router-link>
          <nav class="aig-navigation-menu">
            <ul>
              <li v-for="(bar, index) in navigationBars" :key="index" :class="{ 'marginRight': index === 2 }">
                <router-link v-if="bar.type === 'internal'" active-class="aig-bar-active" :class="{'disabled': bar.disabled}" :to="bar.routeLink">
                  {{ bar.name }}
                </router-link>
                <a v-if="bar.type === 'external'" active-class="aig-bar-active" target="_blank" :href="bar.link" :class="{'disabled': bar.disabled}">
                  {{ bar.name }}
                </a>
              </li>
            </ul>
          </nav>

          <div class="aig-profile-wrapper">
            <UserWalletTab  />
          </div>
          <div v-on:click="dropDownMenuActive = !dropDownMenuActive" class="aig-hamburger-wrapper">
            <hamburger v-bind:menuActive="dropDownMenuActive"></hamburger>
          </div>
        </div>
      </div>

    </transition>
    <div class="aig-dropdown" v-if="dropDownMenuActive">
      <ul>
        <li v-for="bar in navigationBars" :key="bar.name">
          <router-link v-if="bar.type === 'internal'" :class="{'disabled': bar.disabled}" active-class="aig-bar-active" :to="bar.routeLink"
            @click.native="dropDownMenuActive = false">
            {{ bar.name }}
          </router-link>
          <a v-if="bar.type === 'external'" active-class="aig-bar-active" target="_blank" :href="bar.link" :class="{'disabled': bar.disabled}">
            {{ bar.name }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import UserTab from '@/components/UserTab'
import UserWalletTab from '@/components/UserWalletTab'
import Hamburger from './Hamburger'

export default {
  name: 'Navigation',
  components: {
    UserTab,
    Hamburger,
    UserWalletTab
  },
  data () {
    return {
      navigationBars: [],
      dropDownMenuActive: false
    }
  },
  computed: {
    isDevEnv () {
      return process.env.NODE_ENV !== 'production'
    },
    showAccount () {
      // Temporary workaround, while we still have accounts
      return this.$route.fullPath.indexOf('/data') > -1 ||
        this.$route.fullPath.indexOf('/profile') > -1 ||
        this.$route.fullPath.indexOf('/login') > -1
    }
  },
  created () {
    if (process.env.FEATURE_TOGGLE.DATA) {
      this.navigationBars.push({
        name: this.$t('navigation.data'),
        type: 'external',
        link: process.env.NAVIGATION_DATA_URL
      })
    }

    if (process.env.FEATURE_TOGGLE.WIKI) {
      this.navigationBars.push({
        name: this.$t('navigation.wiki'),
        type: 'external',
        link: 'https://aigangnetwork.github.io/'
      })
    }

    if (process.env.FEATURE_TOGGLE.DISCUSSIONS) {
      this.navigationBars.push({
        name: this.$t('navigation.discussions'),
        type: 'internal',
        routeLink: '/discussions'
      })
    }

    if (process.env.FEATURE_TOGGLE.POOLS) {
      this.navigationBars.push({
        name: this.$t('navigation.pools'),
        routeLink: '/pools',
        type: 'internal'
      })
    }

    if (process.env.FEATURE_TOGGLE.PREDICTIONS) {
      this.navigationBars.push({
        name: this.$t('navigation.predictions'),
        routeLink: '/predictions',
        type: 'internal'
      })
    }

    if (process.env.FEATURE_TOGGLE.INSURANCE) {
      this.navigationBars.push({
        name: this.$t('navigation.insurance'),
        routeLink: '/insurance',
        type: 'internal'
      })
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
    z-index: 1002;
    background-color: $purple;
    line-height: 3em;

    ul {
      list-style-type: none;
      padding-left: 0;

      li {
        width: 100%;

        .disabled {
          pointer-events: none;
          opacity: 0.25;
        }

        a {
          color: $white;
          padding: 10px;
          padding-left: 40px;
          display: block;
        }
      }
    }

    @include breakpoint(min-width 1000px) {
      display: none;
    }
  }

  .marginRight {
    margin-right: 70px;
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
    margin-top: 5px;

    img {
      vertical-align: middle;
      height: 30px;
    }

    .alpha-container {
      color: white;
      font-size: 9px;
      display: flex;
      justify-content: right;
      font-weight: 600;
    }
  }

  .aig-navigation {
    margin: 0 auto;
    width: 100%;
    background: $purple;
    width: 100%;

    .aig-navigation-body {
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

      @include breakpoint(max-width 1000px) {
        .aig-hamburger-wrapper {
          display: block;
          cursor: pointer;
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

  .disabled {
    pointer-events: none;
    opacity: 0.25;
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

    @include breakpoint(max-width 1000px) {
      ul {
        background: white;
      }
    }
  }
</style>
