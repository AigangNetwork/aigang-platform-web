<template>
  <img class="aig-cross" v-if="menuActive" src="/static/close-white.svg" alt="">
  <img class="aig-hamburger" v-else src="/static/hamburger-icon.svg" alt="">
</template>
<script>
export default {
  props: {
    menuActive: {
      required: true,
      type: Boolean
    }
  },
  data () {
    return {
      active: this.menuActive
    }
  }
}
</script>

<style lang="scss">
  @import '~helpers/variables';
  .aig-hamburger,
  .aig-cross {
    height: 40px;
    width: 46px;
    margin: 15px;
  }
</style>
