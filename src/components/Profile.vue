<template>
  <router-link to="/profile" class="aig__profile">
    <div class="photo">
      {{ $store.state.user.profile.firstName.charAt(0) }}
    </div>
    <div class="information">
      {{ $store.state.user.profile.firstName }}
      <div class="balance">10 000 AIX</div>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
@import '~helpers/variables';
@import '~helpers/mixins';

.aig__profile {
  @include clearfix;
  margin: 0 auto;
  justify-content: center;
  font-weight: normal;
  height: 100%;
  flex-wrap: nowrap;
  display: flex;
  font-size: 11px;
  font-family: $font-primary;
  font-weight: 500;
  text-align: right;
  align-items: center;
  font-size: 11px;
  font-weight: 400;
  line-height: 1;
  width: 100%;
  .photo {
    pointer-events: none;
    flex-shrink: 0;
    height: 46px;
    width: 46px;
    border-radius: 50%;
    margin-left: 7px;
    background: #f3f0f0cc;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(white, .25);
    text-align: center;
    margin-right: 17px;
  }
  .information {
    color: $white;
    margin-right: 10px;
    .balance {
      flex-basis: 100%;
      margin-top: 2px;
      color: $gray;
    }
  }
}
</style>
