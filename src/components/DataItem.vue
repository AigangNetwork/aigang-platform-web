<template>
  <div class="aig__data">
    <div class="title">Samsung Galaxy Tab 3</div>
    <div class="desc">Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc pharetra faucibus tellus.</div>
  </div>
</template>

<script>
export default {
  name: 'DataItem'
}
</script>

<style lang="scss" scoped>
@import '~helpers/variables';
@import '~helpers/mixins';

.aig__data {
  width: 100%;
  padding: 25px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.06);
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.06);
  float: left;
  .title {
    font-family: $font-secondary;
    font-weight: 500;
    font-size: 15px;
  }
  .desc {
    line-height: 1.3;
    margin-top: 7px;
    color: darken($gray, 50);
    font-size: 13px;
  }
}
</style>
