<template>
  <el-row class="device-data">
    <p class="device-data-title">{{ $t('insurance.policy.deviceData.title') }}</p>

    <div class="device-data-item">
      <label>{{ $t('insurance.policy.deviceData.wearLevel') }}:</label>
      {{ data.WL | uppercase }}
    </div>

    <div class="device-data-item">
      <label>{{ $t('insurance.policy.deviceData.batteryDesignCapacity') }}:</label>
      {{ data.DC }}
    </div>

    <div class="device-data-item">
      <label>{{ $t('insurance.policy.deviceData.chargeLevel') }}:</label>
      {{ data.CL }} %
    </div>

    <div class="device-data-item">
      <label>{{ $t('insurance.policy.deviceData.ageInMonths') }}:</label>
      {{ data.DA }}
    </div>

    <div class="device-data-item">
      <label>{{ $t('insurance.policy.deviceData.region') }}:</label>
      {{ data.R | uppercase}}
    </div>

    <div class="device-data-item">
      <label>{{ $t('insurance.policy.deviceData.brand') }}:</label>
      {{ data.DB | uppercase }}
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

  .device-data-item {
    border-bottom: 1px dotted #c8d1f1;
    padding: 5px;
    display: flex;
    flex-direction: row;
    text-align: right;

    label {
      font-weight: 300;
      flex-grow: 1;
      text-align: left;
    }
  }

  .device-data-title {
    background: #dcdfe6;
    font-weight: 400;
    text-align: center;
    color: black;
  }

  .device-data {
    font-family: $font-secondary;
    margin-bottom: 20px;
  }
</style>
