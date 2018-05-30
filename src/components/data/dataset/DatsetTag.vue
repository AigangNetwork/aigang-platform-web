<template>
  <div class="tag-template">
    <span class="tag-text">
      <slot></slot>
    </span>
  </div>
</template>>
<script>
export default {

}

</script>
<style lang="scss" scoped>
  .tag-template {
    min-width: 115px;
    height: 24px;
    border-radius: 2px;
    background-color: #fcfcfe;
    border: solid 1px #e5efff;
    display: flex;
    justify-content: left;
    align-items: center;
    margin: 0px 0px 5px 10px;
    padding: 0px 10px 0px 10px;
    .tag-text {
      font-size: 12px;
      letter-spacing: 1px;
      text-align: center;
      color: #9588d7;
    }
  }

</style>
