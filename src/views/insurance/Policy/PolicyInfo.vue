<template>
    <el-row class="policy-data">
      <p>
        <label>{{ $t('insurance.policy.policyId') }}:</label>
        <span>{{ data.id }}</span>
      </p>

      <p>
        <label>{{ $t('insurance.policy.deviceId') }}:</label>
        {{ data.deviceId }}
      </p>

      <p>
        <label>{{ $t('insurance.product.calculatedPremium') }}:</label>
        {{ data.premium }}
        <span class="text-medium"> {{ $t('general.aix') }} </span>
      </p>

      <p>
        <label>{{ $t('insurance.product.payout') }}:</label>
        {{ data.payout }}
        <span class="text-medium"> {{ $t('general.aix') }} </span>
      </p>

      <p>
        <label>{{ $t('insurance.product.fee') }}:</label>
        {{ data.fee }}
        <span class="text-medium"> %
        </span>
      </p>

      <p>
        <label>{{ $t('insurance.policy.policyStatus') }}:</label>
        {{ data.status | uppercase }}
        <span class="text-medium">
        </span>
      </p>

      <p v-if="data.currentPolicy">
        <label>{{ $t('insurance.policy.txHash') }}:</label>
        <a class="address" :href="txLink" target="_blank"><span class="contract-address">{{ this.data.txHash }}</span></a>
        <span class="text-medium">
        </span>
      </p>
    </el-row>
</template>
<script>
export default {
  props: ['data'],
  computed: {
    txLink () {
      return process.env.ETHERSCAN_ADDRESS + this.data.txHash
    }
  }
}
</script>
<style lang="scss">
  @import '~helpers/variables';
  @import '~helpers/mixins';

  @include policy-data;
</style>
