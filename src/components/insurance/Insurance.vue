<template>
  <div class="aig-container">
    <el-container class="aig-container">
      <el-aside
        width="20%"
        class="aig-data-menu"
        :class="{ 'is-menu-open': isMenuOpen }">
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
                :to="item.routeLink">{{ item.name }}</router-link>
            </li>
          </ul>
        </span>
      </el-aside>

      <el-main class="aig-data-container">
        <el-row :gutter="20" class="aig-items">
          <router-view :key="$route.path" />
        </el-row>
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
          name: this.$t('insurance.menu.products'),
          routeLink: {
            path: '/insurance/products'
          },
          active: true
        },
        {
          name: this.$t('insurance.menu.myPolicies'),
          routeLink: {
            path: '/insurance/policy/mypolicies'
          },
          active: false,
          disabled: true
        }
      ],
      searchInput: '',
      showDialog: false,
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

  @include aig-side-menu;
</style>
