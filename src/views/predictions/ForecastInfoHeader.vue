<template>
  <div class="header-content">
    <div class="forecast-title">{{ forecast.predictionTitle | truncate(128) }}</div>
    <div class="info">
      <div class="icon-container" v-if="forecast.predictionStatus === 'published'">
        <img src="/static/icons/clock-white.svg" class="header-icon"/>
        <span>{{ $t('predictions.forecastsEnd')}}: <Date :dateUtc="forecast.forecastEndUtc" format="YYYY-MM-DD HH:mm:ss (UTC Z)"/></span>
      </div>
      <div class="icon-container" v-if="forecast.predictionStatus === 'published'">
        <img src="/static/icons/finish-white.svg" class="header-icon"/>
        <span>{{ $t('predictions.results')}}: <Date :dateUtc="forecast.resultDateUtc" format="YYYY-MM-DD HH:mm:ss (UTC Z)"/></span>
      </div>
      <div class="icon-container" v-if="forecast.predictionStatus === 'resolved'">
        <img src="/static/icons/finish-white.svg" class="header-icon"/>
        <span>{{ $t('predictions.resultsAnnounced')}}</span>
      </div>
      <div class="icon-container">
        <img src="/static/icons/user-white.svg" class="header-icon"/>
        <span>{{ $t('predictions.forecastsCount')}}: {{ forecast.forecastsCount }}</span>
      </div>
      <div class="icon-container">
        <img src="/static/icons/volume-white.svg" class="header-icon"/>
        <span>{{ $t('predictions.volume')}}: {{ forecast.poolSize }} {{ $t('general.aix')}}</span>
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
  props: ['forecast']
}
</script>

<style lang="scss">
  .header-content {
    .forecast-title {
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
