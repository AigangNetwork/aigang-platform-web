<template>
  <el-row class="device-data">
    <p class="device-data-title">{{ $t('insurance.policy.deviceData.deviceData') }}</p>

    <div class="device-data-item">
      <label>{{ $t('insurance.policy.deviceData.wearLevel') }}:</label>
      {{ data.WearLevel | uppercase }}
    </div>

    <div class="device-data-item">
      <label>{{ $t('insurance.policy.deviceData.batteryDesignCapacity') }}:</label>
      {{ data.BatteryDesignCapacity }}
    </div>

    <div class="device-data-item">
      <label>{{ $t('insurance.policy.deviceData.chargeLevel') }}:</label>
      {{ data.ChargeLevel }} %
    </div>

    <div class="device-data-item">
      <label>{{ $t('insurance.policy.deviceData.ageInMonths') }}:</label>
      {{ data.AgeInMonths }}
    </div>

    <div class="device-data-item">
      <label>{{ $t('insurance.policy.deviceData.region') }}:</label>
      {{ data.Region | uppercase}}
    </div>

    <div class="device-data-item">
      <label>{{ $t('insurance.policy.deviceData.brand') }}:</label>
      {{ data.Brand | uppercase }}
    </div>

    <div class="device-data-item">
      <label>{{ $t('insurance.policy.deviceData.fetchDateTime') }}:</label>
      <Date v-if="data.FetchDateTime" :dateUtc="data.FetchDateTime" />
    </div>
  </el-row>
</template>
<script>
import Date from '@/components/Date'

export default {
  components: { Date },
  props: ['data']
}
</script>
<style lang="scss">
  @import '~helpers/variables';
  @import '~helpers/mixins';

  @include policy-data;
</style>
