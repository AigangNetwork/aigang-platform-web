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
    </el-row>
</template>
<script>
export default {
  props: ['data']
}
</script>
<style lang="scss">
  @import '~helpers/variables';
  @import '~helpers/mixins';

  @include policy-data;
</style>
