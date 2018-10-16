<template>
  <div class="aig-container">
    <el-container class="aig-container">
      <el-aside v-if="$store.state.user.authenticated" width="20%" class="aig-data-menu" :class="{ 'is-menu-open': isMenuOpen }">
        <span>
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
              <router-link :class="{'aig-link-disabled': item.disabled && !$store.getters['user/isAuthenticated']}"
                @click.native="collapseSideMenu" active-class="aig-menu-active" :to="item.routeLink">{{ item.name }}</router-link>
            </li>
          </ul>
        </span>
      </el-aside>
      <el-main class="aig-data-container" :class="{ 'is-authenticated': $store.getters['user/isAuthenticated']}">
        <el-row :gutter="20" class="aig-items">
          <router-view :key="$route.path"></router-view>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataMeniu: [{
        name: this.$t('pools.portfolio'),
        routeLink: { name: 'Portfolio' },
        active: true
      },
      {
        name: this.$t('pools.products'),
        routeLink: {
          name: 'PoolsProducts'
        },
        active: false,
        disabled: true
      }],
      showDialog: false,
      isMenuOpen: false
    }
  },
  methods: {
    selectMenu (index) {
      this.dataMeniu.forEach(function (val, key) {
        val.active = false
      })
      this.dataMeniu[index].active = true
    },
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

  @include aig-side-menu;
</style>
