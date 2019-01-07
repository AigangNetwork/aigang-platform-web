<template>
  <el-row class="policy-data">
    <p>
      <label>{{ $t('insurance.policy.policyId') }}:</label>
      <span>{{ policy.id }}</span>
    </p>

    <p>
      <label>{{ $t('insurance.policy.deviceId') }}:</label>
      {{ policy.deviceId }}
    </p>

    <p>
      <label>{{ $t('insurance.product.calculatedPrice') }}:</label>
      {{ policy.premium }}
      <span class="text-medium"> {{ $t('general.aix') }} </span>
    </p>

    <p>
      <label>{{ $t('insurance.product.payout') }}:</label>
      {{ policy.payout }}
      <span class="text-medium"> {{ $t('general.aix') }} </span>
    </p>

    <p>
      <label>{{$t('insurance.policy.startDate')}}</label>
      <span class="text-medium">
        <Date :dateUtc="policy.startUtc" format="YYYY-MM-DD HH:mm (UTC Z)"/>
      </span>
    </p>

    <p>
      <label>{{$t('insurance.policy.endDate')}}</label>

      <span class="text-medium">
        <Date :dateUtc="policy.endUtc" format="YYYY-MM-DD HH:mm (UTC Z)"/>
      </span>
    </p>

    <p>
      <label>{{ $t('insurance.product.insuranceTerm') }}:</label>
      {{ policy.policyTermInDays }}
      <span class="text-medium" v-if="policy.policyTermInDays > 1"> {{ $t('general.days') }} </span>
      <span class="text-medium" v-else> {{ $t('general.day') }} </span>
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
import Date from '@/components/Date'

export default {
  mixins: [PolicyStatus],
  components: { Date },
  props: ['policy']
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
