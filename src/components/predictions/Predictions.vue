<template>
  <div class="aig-container">
    <el-container class="aig-container">
      <el-aside
        width="20%"
        class="aig-data-menu"
        :class="{ 'is-menu-open': isMenuOpen }"
      >
        <span>
          <transition name="fade">
            <span class="side-menu-button" v-if="!isMenuOpen" @click="openSideMenu">
              <img src="/static/right.svg" />
            </span>
            <span class="side-menu-button" v-if="isMenuOpen" @click="openSideMenu">
              <img src="/static/left.svg" />
            </span>
          </transition>
          <ul>
            <li v-for="item in dataMenu" :key="item.name">
              <router-link
                @click.native="collapseSideMenu"
                active-class="aig-menu-active"
                :to="item.routeLink"
                >{{ item.name }}</router-link
              >
            </li>
          </ul>
        </span>
      </el-aside>
      <el-main class="aig-data-container" :class="{ 'is-authenticated': $store.state.user.authenticated}">
        <el-row :gutter="20" class="aig-items"> <router-view :key="$route.path"></router-view> </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataMenu: [
        {
          name: this.$t('predictions.menu.predictions'),
          routeLink: {
            path: '/predictions/all'
          },
          active: true
        },
        {
          name: this.$t('predictions.menu.myForecasts'),
          routeLink: {
            path: '/predictions/myforecasts'
          },
          active: false,
          disabled: true
        }
      ],
      isMenuOpen: false
    }
  },
  methods: {
    openSideMenu () {
      this.isMenuOpen = !this.isMenuOpen
    },
    collapseSideMenu () {
      this.isMenuOpen = false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~helpers/variables';
  @import '~helpers/mixins';
  @import '~helpers/transitions';

  .aig-data-container {
    padding-left: 60px;
    padding-right: 60px;
    overflow-x: hidden;
    height: 100%;
    max-width: 1200px;
    min-height: 600px;
    @include breakpoint(max-width 1150px) {
      padding-left: 10px;
      padding-right: 10px;
    }
  }

  .wrapper.el-button {
    width: 100%;
  }

  .el-input-inner {
    height: 100px;
  }

  .aig-upload-btn {
    width: 100%;
  }

  .aig-data-menu {
    border-right: 1px solid $light-border-blue;
    border-left: 1px solid $light-border-blue;
    position: relative;
    transition: all 200ms;
    &.is-menu-open {
      width: 200px !important;
    }
    .side-menu-button {
      display: none;
      width: 100%;
      text-align: center;
      padding-top: 45px;
      font-family: Roboto;
      font-size: 32px;
      img {
        height: 35px;
      }
    }
    ul {
      font-size: 18pt;
      padding: 45px;
      list-style-type: none;
      a {
        color: #ccc9d6;
        padding: 10px 0 10px 10px;
        display: inline-block;
        transition: all 200ms;
      }
      .aig-menu-active {
        color: $purple;
        &:before {
          display: inline-block;
          position: relative;
          content: '';
          height: 1px;
          width: 47px;
          background: purple;
          margin-bottom: 8px;
          margin-left: -55px;
          margin-right: 8px;
        }
      }
    }
  }

  /* Tablet */

  @media screen and (min-width: 681px) and (max-width: 1024px) {
    .aig-container .aig-data-menu {
      ul {
        padding: 45px 15px;
        a {
          font-size: 20px;
        }
      }
      .aig-menu-active a {
        padding: 10px 0;
        &:before {
          width: 24px;
          margin-left: -20px;
          margin-right: 0;
        }
      }
    }
  }

  /* Mobile */

  @media screen and (min-width: 100px) and (max-width: 680px) {
    .aig-container {
      section.aig-container {
        position: relative;
      }
    }

    .aig-container .aig-data-menu {
      position: absolute;
      z-index: 1001;
      left: 0;
      overflow-x: hidden;
      height: 100%;
      .side-menu-button {
        display: block;
        cursor: pointer;
      }
      ul {
        padding: 45px 15px;
        a {
          opacity: 0;
          pointer-event: none;
          font-size: 18px;
        }
        .aig-menu-active a {
          padding: 10px 0;
          &:before {
            width: 24px;
            margin-left: -20px;
            margin-right: 0;
          }
        }
      }
      &.is-menu-open {
        a {
          opacity: 1;
          pointer-events: all;
          &:before {
            display: inline-block;
          }
        }
      }
    }

    .aig-container {
      .aig-data-container {
          margin-left: 20%;

        .data-search {
          width: 100%;
          display: block;
          margin-bottom: 20px;
        }

        .data-upload-button-container {
          width: 100%;
          display: block;
        }
      }
    }
  }
</style>
