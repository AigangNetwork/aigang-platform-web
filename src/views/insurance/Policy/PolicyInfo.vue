<template>
    <el-row class="policy-data">
      <p>
        <label>{{ $t('insurance.policy.policyId') }}:</label>
        <span class="align-right">{{ policy.id }}</span>
      </p>

      <p>
        <label>{{ $t('insurance.policy.deviceId') }}:</label>
        {{ policy.deviceId }}
      </p>

      <p>
        <label>{{ $t('insurance.product.calculatedPremium') }}:</label>
        {{ policy.premium }}
        <span class="text-medium"> {{ $t('general.aix') }} </span>
      </p>

      <p>
        <label>{{ $t('insurance.product.payout') }}:</label>
        {{ policy.payout }}
        <span class="text-medium"> {{ $t('general.aix') }} </span>
      </p>

      <p>
        <label>{{ $t('insurance.product.fee') }}:</label>
        {{ policy.fee }}
        <span class="text-medium"> %
        </span>
      </p>

      <p>
        <label>{{ $t('insurance.policy.policyStatus') }}:</label>
        {{ status | uppercase }}
        <span class="text-medium">
        </span>
      </p>
    </el-row>
</template>
<script>
import PolicyStatus from '@/components/mixins/PolicyStatus'

export default {
  props: ['policy'],
  mixins: [ PolicyStatus ]
}
</script>
<style lang="scss">
  @import '~helpers/variables';
  @import '~helpers/mixins';

  @include policy-data;

  .policy-data {
    .align-right {
      text-align: right;
    }
  }
</style>
