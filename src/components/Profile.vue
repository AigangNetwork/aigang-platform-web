<template>
  <div class="aig__profile">
    <div class="information">
      <div class="name">Laurynas Puodžius</div>
      <div class="balance">10 000 AIX</div>
    </div>
    <div class="photo"></div>
  </div>
</template>

<style lang="scss" scoped>
@import '~helpers/variables';
@import '~helpers/mixins';

.aig__profile {
  font-size: 12px;
  border-radius: 4px;
  display: flex;
  text-align: right;
  align-items: center;
  font-family: $font-secondary;
  font-weight: 500;
  text-transform: uppercase;
  .photo {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background: darken($gray, 7);
    margin-left: 8px;
  }
  .information {
    .balance {
      font-size: 11px;
      margin-top: 3px;
      color: $purple;
    }
  }
}
</style>
