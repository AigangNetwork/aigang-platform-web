<template>
  <header class="aig__header">
    <div class="aig__header__top">
      <div class="aig__container">
        <Navigation/>
        <Profile/>
      </div>
    </div>
  </header>
</template>

<script>
import Navigation from '@/components/Navigation'
import Profile from '@/components/Profile'

export default {
  name: 'Header',
  components: {
    Navigation,
    Profile
  }
}
</script>

<style lang="scss">
@import '~helpers/variables';

.aig__header {
  position: relative;
  background: #9549c8;
  background: linear-gradient(to bottom right, #9549c8 0%, #5833b7 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  .aig__header__top,
  .aig__header__body,
  .aig__header__footer {
    width: 100%;
  }
  .aig__header__body {
    padding-top: 20px;
    padding-bottom: 20px;
  }
  .aig__profile {
    float: right;
  }
}
</style>
