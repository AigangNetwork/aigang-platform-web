<template>
  <div class="aig-profile" v-if="$store.getters['user/isWeb3Enabled']">
    <div class="container">
      <a class="address" target="_blank" :href="contractLink">
        <span>{{ $store.getters['user/coinbase'] | truncate(10) }}</span>
        <span><transition name="slideUp"><span class="balance">{{ $store.getters['user/aixBalance'] }}</span></transition> AIX </span>
      </a>
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
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 25px;
    background: linear-gradient(to right, #4f3b8e 0%, #6237bb 100%);

    &:hover {
      span {
        color: $gray;
      }
    }

    span {
      transition: all 200ms;
      display: block;
      margin: 10px 0;
      text-align: right;
      font-size: 12px;
      color: white;
    }

    .address {
      color: white
    }

    .balance {
      font-weight: 600;
      font-size: 18px;
      color: white;
      display: inline;
    }
  }

</style>
