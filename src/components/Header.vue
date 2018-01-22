<template>
  <header class="aig__header">
    <div class="aig__header__top">
      <div class="aig__container">
        <Navigation/>
        <Profile/>
      </div>
    </div>
    <!-- <div class="aig__header__body">
      <div class="aig__container">
        <slot name="title"></slot>
      </div>
    </div> -->
    <vue-particles style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;"
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="edge"
      :particleSize="2"
      linesColor="#dedede"
      :linesWidth="0"
      :lineLinked="false"
      :lineOpacity="0"
      :linesDistance="0"
      :moveSpeed="3"
    ></vue-particles>
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
