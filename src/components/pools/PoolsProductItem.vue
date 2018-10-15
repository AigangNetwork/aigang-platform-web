<template>
  <router-link :to="{ name: 'PoolsProduct', params: { id: '123'}}" class="investment-product-item">
    <div class="left-section">
      <span class="title">{{ product.title }}</span>
    </div>
    <div class="right-section">
      <div>
        <span class="investment-item-label">{{ $t('pools.portfolioInfo.predictedProfit') }}</span>
        {{ product.predictedProfit }}
      </div>
      <div>
        <span class="investment-item-label">{{ $t('pools.portfolioInfo.invested') }}</span>
        {{ product.investedCount }}
      </div>
      <div>
        <span class="investment-item-label">{{ $t('pools.portfolioInfo.currentPoolSize') }}</span>
        {{ product.currentPoolSize }}
      </div>
      <div>
        <span class="investment-item-label">{{ $t('pools.portfolioInfo.poolSizeGoal') }}</span>
        {{ product.poolSize }}
      </div>
    </div>
  </router-link>
</template>
<script>
export default {
  props: ['product']
}
</script>
<style lang="scss" scoped>
  @import '~helpers/variables';

  .investment-product-item {
    width: 85%;
    background: white;
    margin: 0px 25px 0px 25px;
    box-shadow: 0 0 30px 0 #e9f0f6;
    border: 1px solid #e5f0ff;
    display: flex;
    font-family: $font-primary;
    color: $purple;

    height: 150px;
    margin-bottom: 20px;
    flex-direction: row;
    justify-content: space-between;

    &:hover {
      /* .right-section {
        border-bottom: 5px solid $yellow;
        padding: 15px;
        padding-right: 30px;
      } */

      .left-section {
        border-left: 5px solid $yellow;
        padding-left: 30px;
      }
    }

    .left-section,
    .right-section {
      padding: 20px;
      transition: 200ms all;
    }

    .left-section {
      display: flex;
      justify-content: center;
      flex-direction: column;
      width: 50%;
    }

    .right-section {
      width: 50%;
      font-family: $font-secondary;
      background: $button-purple;
      background: $purple-gradient-top-down;
      color: white;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      div {
        width: 50%;
        font-size: 16pt;
        font-weight: 600;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
      }
    }

    .title {
      font-weight: 600;
      font-size: 16pt;
      display: inline-block;
    }
  }

  .investment-item-label {
    display: block;
    text-transform: uppercase;
    font-size: 8pt;
    font-weight: 300;
  }
</style>
