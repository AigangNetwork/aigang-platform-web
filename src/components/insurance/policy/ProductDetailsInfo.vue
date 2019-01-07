<template>
  <el-row v-if="data" class="claim-data">
    <p class="claim-data-title">{{ $t('insurance.product.productDetails') }}</p>

    <div class="claim-data-item">
      <label>{{ $t('insurance.policy.contractAddress') }}:</label>
      <span class="text-medium">
        <a class="link" :href="formatTxLink(data.contractAddress)" target="_blank">
          {{ data.contractAddress }}
        </a>
      </span>
    </div>

    <h4 class="info-title">{{ $t('insurance.product.termsAndConditions') }}</h4>
    <ScrollableMarkupText class="scrollable-text" :text="data.termsAndConditions" />

  </el-row>
</template>
<script>
import ScrollableMarkupText from '@/components/insurance/ScrollableMarkupText'

export default {
  components: { ScrollableMarkupText },
  props: ['data'],
  methods: {
    formatTxLink (txId) {
      return process.env.ETHERSCAN_ADDRESS + process.env.ADDRESS_PATH + txId
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~helpers/variables';
  @import '~helpers/mixins';

  @include policy-data;

  .claim-data-item {
    .link {
      color: $light-blue ;
    }
  }

  .scrollable-text {
      height: 200px;
      margin-bottom: 20px;
  }
</style>
