<template>
  <header class="aig-header">
    <div class="aig-header-top">
      <div class="aig-container">
        <Navigation/>
        <UserTab/>
      </div>
    </div>
  </header>
</template>

<script>
import Navigation from '@/components/Navigation'
import UserTab from '@/components/UserTab'

export default {
  name: 'Header',
  components: {
    Navigation,
    UserTab
  }
}
</script>

<style lang="scss">
  @import '~helpers/variables';

  .aig-header {
    position: relative;
    background: #9549c8;
    background: linear-gradient(to bottom right, #9549c8 0%, #5833b7 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    .aig-header-top,
    .aig-header-body,
    .aig-header-footer {
      width: 100%;
    }
    .aig-header-body {
      padding-top: 20px;
      padding-bottom: 20px;
    }
    .aig-profile {
      float: right;
    }
  }
</style>
