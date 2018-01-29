<template>
  <router-link to="/profile" class="aig__profile">
    <div class="information">
      {{ $t('account.balance') }}
      <div class="balance">10 000 AIX</div>
    </div>
    <div class="photo"></div>
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
  font-family: $font-secondary;
  font-weight: 500;
  height: 50px;
  text-align: right;
  align-items: center;
  font-size: 11px;
  font-weight: 400;
  line-height: 1;
  .photo {
    flex-shrink: 0;
    height: 26px;
    width: 26px;
    border-radius: 5px;
    margin-left: 7px;
    background: rgba(0, 0, 0, .35);
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
