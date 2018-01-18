<template>
  <div class="aig__data">
    <div class="piece main">
      <div class="title">Samsung Galaxy Tab 3</div>
      <div class="desc">Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc pharetra faucibus tellus.</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Data'
}
</script>

<style lang="scss" scoped>
@import '~helpers/variables';
@import '~helpers/mixins';

.aig__data {
  width: 100%;
  padding: 20px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: flex-start;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.06);
  &+.aig__data {
    margin-top: 10px;
  }
  .piece {
    &.main {
      flex-basis: 30%;
    }
    .title {
      flex-basis: 25%;
      font-size: 14px;
      font-family: $font-secondary;
      text-transform: uppercase;
      &+.desc {
        margin-top: 8px;
      }
    }
    .desc {
      line-height: 1.45;
      font-size: 12px;
      font-family: $font-secondary;
      color: darken(#8fa6b0, 15);
    }
  }
}
</style>
