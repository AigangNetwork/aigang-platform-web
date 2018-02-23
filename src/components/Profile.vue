<template>
  <router-link to="/profile" class="aig__profile">
    <div class="information">
      {{ $t('account.balance') }}
      <div class="balance">10 000 AIX</div>
    </div>
    <div class="photo">
      {{ $store.state.user.profile.firstName.charAt(0) }}
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
@import '~helpers/variables';
@import '~helpers/mixins';

.aig__profile {
  @include clearfix;
  font-weight: normal;
  height: 100%;
  flex-wrap: nowrap;
  display: flex;
  font-size: 11px;
  font-family: $font-primary;
  font-weight: 500;
  height: 50px;
  text-align: right;
  align-items: center;
  font-size: 11px;
  font-weight: 400;
  line-height: 1;
  .photo {
    pointer-events: none;
    flex-shrink: 0;
    height: 26px;
    width: 26px;
    border-radius: 50%;
    margin-left: 7px;
    background: rgba($black, .45);
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(white, .25);
    text-align: center;
  }
  .information {
    color: $blue-light;
    text-transform: uppercase;
    .balance {
      flex-basis: 100%;
      margin-top: 2px;
      color: $gray;
    }
  }
}
</style>
