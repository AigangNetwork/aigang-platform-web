<template>
  <div class="aig__profile">
    <div class="photo"></div>
    <div class="information">
      Balance
      <div class="balance">10 000 AIX</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '~helpers/variables';
@import '~helpers/mixins';

.aig__profile {
  @include clearfix;
  height: 100%;
  flex-wrap: nowrap;
  padding: 0 10px;
  display: flex;
  font-size: 11px;
  text-align: left;
  font-family: $font-secondary;
  font-weight: 500;
  text-align: left;
  align-items: center;
  background: $purple;
  background: linear-gradient(135deg,#9549c8 0%,#5833b7 100%);
  .photo {
    flex-shrink: 0;
    height: 28px;
    width: 28px;
    border-radius: 5px;
    margin-right: 5px;
    background: $blue-light;
  }
  .information {
    width: 65px;
    color: $blue-light;
    .balance {
      flex-basis: 100%;
      font-size: 12px;
      margin-top: 2px;
      color: white;
    }
  }
}
</style>
