<template>
  <div class="header-content">
    <div class="prediction-title">{{ prediction.title | truncate(128) }}</div>
    <div class="info">
      <div class="icon-container">
        <img src="/static/icons/clock-white.svg" class="header-icon"/>
        <span>{{ $t('predictions.prediction.forecastEnd')}}: <Date :dateUtc="prediction.forecastEndUtc" /></span>
      </div>
      <div class="icon-container">
        <img src="/static/icons/finish-white.svg" class="header-icon"/>
        <span>{{ $t('predictions.prediction.results')}}: <Date :dateUtc="prediction.resultDateUtc" /></span>
      </div>
      <div class="icon-container">
        <img src="/static/icons/user-white.svg" class="header-icon"/>
        <span>{{ $t('predictions.prediction.forecastsCount')}}: {{ prediction.forecastsCount }}</span>
      </div>
      <div class="icon-container">
        <img src="/static/icons/volume-white.svg" class="header-icon"/>
        <span>{{ $t('predictions.prediction.volume')}}: {{ prediction.poolSize}} {{ $t('general.aix')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Date from '@/components/Date'

export default {
  components: {
    Date
  },
  props: ['prediction']
}
</script>

<style lang="scss">
  .header-content {
    .prediction-title {
      padding-bottom: 20px;
      font-size: 27pt;
      font-weight: 700;
      max-width: 100%;
      word-wrap: break-word;
    }

    .info {
      margin-left: 20px;
      .icon-container {
        display: flex;
        margin-bottom: 5px;
        vertical-align: middle;
        .header-icon {
          width: 18px;
          height: 18px;
          margin-right: 8px;
        }
      }
    }
  }
</style>
