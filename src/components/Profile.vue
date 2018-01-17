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
  margin-bottom: 40px;
  text-align: center;
  font-size: 12px;
  border-radius: 4px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .photo {
    height: 64px;
    width: 64px;
    border-radius: 50%;
    background: darken($gray, 7);
    &+.information {
      margin-left: 10px;
    }
  }
  .information {
    margin-top: 15px;
    .name {
      font-weight: 600;
      font-size: 13px;
      text-transform: uppercase;
    }
    .balance {
      font-size: 11px;
      margin-top: 3px;
      font-weight: 600;
      color: $purple;
    }
  }
}
</style>
