<template>
  <div class="header-content">
    <div class="prediction-title">{{ info.title | truncate(128) }}</div>
    <div class="info">
      <div class="icon-container" v-if="info.status === 'published' && utcNow > forecastStartUtc && utcNow < forecastEndUtc">
        <img src="/static/icons/clock-white.svg" class="header-icon" />
        <span>{{ $t('predictions.votingTill')}}:
          <DateComponent :dateUtc="info.forecastEndUtc" format="YYYY-MM-DD HH:mm (UTC Z)" /></span>
      </div>
      <div class="icon-container" v-if="info.status === 'published' && utcNow > forecastEndUtc">
        <img src="/static/icons/clock-white.svg" class="header-icon" />
        <span>{{ $t('predictions.votingEnded')}}</span>
      </div>
      <div class="icon-container" v-if="info.status === 'published' && utcNow < forecastStartUtc">
        <img src="/static/icons/clock-white.svg" class="header-icon" />
        <span>{{ $t('predictions.votingStarts')}}:
          <DateComponent :dateUtc="info.forecastStartUtc" format="YYYY-MM-DD HH:mm (UTC Z)" /></span>
      </div>
      <div class="icon-container" v-if="info.status === 'published'">
        <img src="/static/icons/finish-white.svg" class="header-icon" />
        <span>{{ $t('predictions.results')}}:
          <DateComponent :dateUtc="info.resultDateUtc" format="YYYY-MM-DD HH:mm (UTC Z)" /></span>
      </div>
      <div class="icon-container" v-if="info.status === 'resolved'">
        <img src="/static/icons/finish-white.svg" class="header-icon" />
        <span>{{ $t('predictions.ended')}}</span>
      </div>
      <div class="icon-container" v-if="info.status === 'paused'">
        <img src="/static/icons/finish-white.svg" class="header-icon" />
        <span>{{ $t('predictions.paused')}}</span>
      </div>
      <div class="icon-container" v-if="info.status === 'canceled'">
        <img src="/static/icons/finish-white.svg" class="header-icon" />
        <span>{{ $t('predictions.canceled')}}</span>
      </div>
      <div class="icon-container">
        <img src="/static/icons/user-white.svg" class="header-icon" />
        <span>{{ $t('predictions.forecastsCount')}}: {{ info.forecastsCount }}</span>
      </div>
      <div class="icon-container">
        <img src="/static/icons/volume-white.svg" class="header-icon" />
        <span>{{ $t('predictions.volume')}}: {{ info.poolSize}} {{ $t('general.aix')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import DateComponent from '@/components/Date'

export default {
  components: {
    DateComponent
  },
  props: ['info'],
  data () {
    return {
      utcNow: new Date().getTime()
    }
  },
  computed: {
    forecastStartUtc () {
      return new Date(this.info.forecastStartUtc)
    },
    forecastEndUtc () {
      return new Date(this.info.forecastEndUtc)
    }
  }
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
