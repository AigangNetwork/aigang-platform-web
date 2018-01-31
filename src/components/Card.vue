<template>
  <div class="aig__card">
    <div class="aig__card__body">
      <slot name="body"></slot>
    </div>
    <div class="aig__card__footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card'
}
</script>

<style lang="scss" scoped>
@import '~helpers/variables';

.aig__card {
  color: darken($gray, 50);
  .aig__card__body {
    margin: 0 auto;
    width: 100%;
    padding: 25px;
    border-radius: 5px;
    background: white;
    box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.06);
    border: 1px solid darken($gray, 2);
  }
  .aig__card__footer {
    margin-top: 10px;
    display: flex;
    align-items: center;
    font-size: 12px;
    color: darken($gray, 50);
    justify-content: center;
    text-align: center;
    a {
      color: darken($gray, 50);
      &:hover {
        color: $purple;
      }
      &+a {
        // &:before {
        //   content: '';
        //   vertical-align: middle;
        //   display: inline-block;
        //   height: 11px;
        //   width: 1px;
        //   margin-right: 20px;
        //   background: darken($gray, 10);
        // }
        margin-left: 40px;
      }
    }
  }
}
</style>
