<template>
  <div class="aig-profile">
    <div class="container">
        <span><a class="address" target="_blank" :href="contractLink">{{ $store.getters['user/coinbase'] | truncate(10) }}</a></span>
        <span>{{ $store.getters['user/aixBalance'] }} AIX </span>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    contractLink () {
      return process.env.ETHERSCAN_ADDRESS + process.env.ADDRESS_PATH + this.$store.getters['user/coinbase']
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~helpers/variables';
  @import '~helpers/mixins';

  .aig-profile {
    font-weight: normal;
    height: 100%;
    font-size: 14px;
    font-family: $font-secondary;
    font-weight: 500;
    width: 100%;
    color: $gray;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 25px;
    background: #6237bb;

    span {
      display: block;
      margin: 10px 0;
      text-align: right;
      font-size: 12px;
      color: $gray;
    }

    .address {
      text-decoration: underline;
      color: white;
      color: $gray;
    }
  }

</style>
