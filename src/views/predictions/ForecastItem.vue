<template>
  <router-link :to="{ name: 'ForecastInfo', params: { id: item.id}}">
    <div class="aig-forecast-item">
      <div class="title">
        <h3>{{ item.predictionTitle }}</h3>
      </div>
      <div class="data">{{ $t('predictions.forecasts.forecast') }}: {{ item.outcomeTitle }}</div>
      <div class="data">{{ $t('predictions.forecasts.amount') }}: {{ item.amount }} {{ $t('general.aix') }}</div>
      <div class="data">{{ $t('predictions.forecasts.created') }}: <Date :dateUtc="item.createdUtc" /></div>
    </div>
  </router-link>
</template>

<script>
import Date from '@/components/Date'

export default {
  components: {
    Date
  },
  props: ['item']
}
</script>

<style lang="scss" scoped>
  @import '~helpers/variables';

  .aig-forecast-item {
    background: white;
    margin: 0px 25px 0px 25px;
    padding: 20px;
    min-height: 100px;
    box-shadow: 0 0 30px 0 #e9f0f6;
    border: 1px solid #e5f0ff;

    .title{
      margin-bottom: 10px;
      h3 {
        margin: 0;
      }
    }

    .data {
      color: $dark-gray;
    }
  }
</style>
