<template>
  <div class="aig-container">
    <el-container class="aig-container">
      <el-aside width="20%" class="aig-data-menu" :class="{ 'is-menu-open': isMenuOpen }">
        <span v-if="$store.state.user.authenticated">
          <transition name="fade">
            <span class="side-menu-button" v-if="!isMenuOpen" @click="openSideMenu">
              <img src="../../static/right.svg">
            </span>
            <span class="side-menu-button" v-if="isMenuOpen" @click="openSideMenu">
              <img src="../../static/left.svg">
            </span>
          </transition>
          <ul>
            <li v-for="item in dataMeniu" :key="item.name">
              <router-link :class="{'aig-link-disabled': item.disabled}" active-class="aig-menu-active" :to="item.routeLink" exact>
                {{ item.name }}
              </router-link>
            </li>
          </ul>
        </span>
      </el-aside>
      <el-main class="aig-data-container">
        <el-row :gutter="26">
          <el-col class="data-search" :span="16">
            <el-input :disabled="true" placeholder="Search by name or keywords" v-model="searchInput"></el-input>
          </el-col>
          <el-col :span="8" class="data-upload-button-container">
            <el-tooltip :disabled="$store.getters.isAuthenticated" effect="dark" :content="$t('data.toolbar.uploadDisabled')" placement="top">
              <el-button :disabled="!$store.getters.isAuthenticated" type="primary" @click="$router.push({ name: 'Upload' })" class="aig-upload-btn">{{ $t('actions.upload_new_data')}}</el-button>
            </el-tooltip>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="aig-items">
          <router-view></router-view>
        </el-row>
        <!-- <el-pagination
        v-if="this.dataList.length > 0"
        style="text-align: center; margin-top: 30px;"
        background
        layout="prev, pager, next"
        :total="totalPageCount"
        size="small">
      </el-pagination> -->
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'DataView',
  data () {
    return {
      dataMeniu: [{
        name: this.$t('data.menu.all'),
        routeLink: {
          name: 'all'
        },
        active: true,
        disabled: false
      },
      {
        name: this.$t('data.menu.uploaded'),
        routeLink: {
          name: 'mylist'
        },
        active: false,
        disabled: false
      },
      {
        name: this.$t('data.menu.models'),
        routeLink: '/models',
        active: false,
        disabled: true
      }
      ],
      searchInput: '',
      loading: true,
      showDialog: false,
      msg: 'Data view',
      isMenuOpen: false
    }
  },
  methods: {
    loadDataItems () {
      this.axios.get('/data/list?page=1').then(response => {
        this.dataList = response.data.items
        this.totalPageCount = response.data.totalPages
        this.loading = false
      })
    },
    selectMenu (index) {
      this.dataMeniu.forEach(function (val, key) {
        val.active = false
      })
      this.dataMeniu[index].active = true
    },
    openSideMenu () {
      this.isMenuOpen = !this.isMenuOpen
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
    @include breakpoint(max-width 1150px) {
      padding-left: 10px;
      padding-right: 10px;
    }
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
          content: "";
          height: 1px;
          width: 44px;
          background: purple;
          margin-bottom: 8px;
          margin-left: -55px;
          margin-right: 4px
        }
      }
    }
  }

  /* Tablet */

  @media (min-device-width: 681px) and (max-device-width: 1024px) {
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

  @media (min-device-width: 100px) and (max-device-width: 680px) {
    .aig-container .aig-data-menu {
      position: absolute;
      z-index: 1;
      left: 0;
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
          margin-bottom: 20px
        }
        .data-upload-button-container {
          width: 100%;
          display: block;
        }
      }
    }
  }

</style>
