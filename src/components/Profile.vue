<template>
  <div class="aig__profile">
    <div class="photo"></div>
    <div class="information">
      <div class="name">Laurynas Puodžius</div>
      <div class="balance">10 000 AIX</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '~helpers/variables';
@import '~helpers/mixins';

.aig__profile {
  font-size: 13px;
  border-radius: 4px;
  text-align: left;
  font-family: $font-secondary;
  font-weight: 500;
  text-align: center;
  margin: 0 -25px;
  padding-bottom: 30px;
  .photo {
    margin: 0 auto;
    height: 54px;
    width: 54px;
    border-radius: 50%;
    background: darken($gray, 7);
    margin-bottom: 15px;
  }
  .information {
    .name {
      font-size: 14px;
    }
    .balance {
      font-size: 11px;
      margin-top: 6px;
      color: $purple;
    }
  }
}
</style>
