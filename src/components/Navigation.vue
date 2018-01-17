<template>
  <div class="aig__navigation">
    <nav class="aig__navigation__menu">
      <ul>
        <li>
          <router-link to="/data" exact>Data</router-link>
        </li>
        <li>
          <router-link to="/predictions">Predictions</router-link>
        </li>
        <li>
          <router-link to="/invest" exact>Invest</router-link>
        </li>
        <li>
          <router-link to="/insure" exact>Insure</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navigation'
}
</script>

<style lang="scss" scoped>
@import '~helpers/variables';
@import '~helpers/mixins';

.aig__navigation {
  background: $gray;
  padding: 25px;
  flex-basis: 260px;
  width: 260px;
  flex-shrink: 0;
  height: 100vh;
  a {
    color: $black;
  }
}

.aig__navigation__menu {
  width: 100%;
  ul {
    width: 100%;
    display: block;
    padding-left: 0;
    list-style: none;
    li {
      line-height: 50px;
      margin: 0 -25px;
      border-top: 1px solid rgba(white, .05);
      &:last-child { border-bottom: 1px solid rgba(white, .05); }
      a {
        @include transition;
        padding: 0 25px;
        display: block;
        font-size: 14px;
        &:hover {
          background: darken($gray, 5);
        }
        &.router-link-active {
          background: linear-gradient(90deg,#9549c8 0%,#5833b7 100%);
          color: white;
        }
      }
    }
  }
}
</style>
