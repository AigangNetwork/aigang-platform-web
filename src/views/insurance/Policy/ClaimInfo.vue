<template>
  <el-row v-if="data" class="claim-data">
    <p class="claim-data-title">{{ $t('insurance.policy.claimInfo.title') }}</p>

    <div class="claim-data-item">
      <label>{{ $t('insurance.policy.claimInfo.wearLevel') }}:</label>
      {{ wearLevel | uppercase }}
    </div>

    <div class="claim-data-item">
      <label>{{ $t('insurance.policy.claimInfo.batteryDesignCapacity') }}:</label>
      {{ data.DC }} mAh
    </div>

    <div class="claim-data-item">
      <label>{{ $t('insurance.policy.claimInfo.chargeLevel') }}:</label>
      {{ data.CL }} %
    </div>

    <div class="claim-data-item">
      <label>{{ $t('insurance.policy.claimInfo.ageInMonths') }}:</label>
      {{ data.DA }}
    </div>

    <div class="claim-data-item">
      <label>{{ $t('insurance.policy.claimInfo.region') }}:</label>
      {{ data.R | uppercase}}
    </div>

    <div class="claim-data-item">
      <label>{{ $t('insurance.policy.claimInfo.brand') }}:</label>
      {{ data.DB | uppercase }}
    </div>
  </el-row>
</template>
<script>
import Date from '@/components/Date'
import WearLevel from '@/components/mixins/WearLevel'

export default {
  components: { Date },
  mixins: [ WearLevel ],
  props: ['data']
}
</script>
<style lang="scss">
  @import '~helpers/variables';
  @import '~helpers/mixins';

  @include policy-data;

  .claim-data-item {
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

  .claim-data-title {
    background: #dcdfe6;
    font-weight: 400;
    text-align: center;
    color: black;
  }

  .claim-data {
    font-family: $font-secondary;
    margin-bottom: 20px;
  }
</style>
