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
      <label>{{ $t('insurance.product.calculatedPrice') }}:</label>
      {{ data.premium }}
      <span class="text-medium"> {{ $t('general.aix') }} </span>
    </p>

    <p>
      <label>{{ $t('insurance.product.payout') }}:</label>
      {{ data.payout }}
      <span class="text-medium"> {{ $t('general.aix') }} </span>
    </p>

    <p>
      <label>{{$t('insurance.policy.startDate')}}</label>
      <span class="text-medium">
        <Date :dateUtc="data.startUtc" />
      </span>
    </p>

    <p>
      <label>{{$t('insurance.policy.endDate')}}</label>

      <span class="text-medium">
        <Date :dateUtc="data.endUtc" />
      </span>
    </p>

    <p>
      <label>{{ $t('insurance.product.insuranceTerm') }}:</label>
      {{ data.policyTermInDays }}
      <span class="text-medium" v-if="data.policyTermInDays > 1"> {{ $t('general.days') }} </span>
      <span class="text-medium" v-else> {{ $t('general.day') }} </span>
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
import PolicyStatus from '@/components/mixins/PolicyStatus'
import Date from '@/components/Date'

export default {
  mixins: [PolicyStatus],
  components: { Date },
  props: ['data']
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
