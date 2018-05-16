<template>
  <div class="aig-card">
    <div class="aig-card-body">
      <slot name="body"></slot>
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

  .aig-card {
    color: darken($gray, 50);
    .aig-card-body {
      margin: 0 auto;
      width: 100%;
      padding: 35px;
      background: white;
      box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.06);
      border: 1px solid darken($gray, 2);
    }
  }

</style>
