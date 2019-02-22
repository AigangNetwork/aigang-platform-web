<template>
  <div class="header-content">
    <div class="prediction-title">{{ info.title | truncate(128) }}</div>
    <div class="info">
      <div class="icon-container" v-if="info.status === 'published'">
        <img src="/static/icons/clock-white.svg" class="header-icon" />
        <span>{{ $t('predictions.votingTill')}}: <Date :dateUtc="info.forecastEndUtc" format="YYYY-MM-DD HH:mm (UTC Z)" /></span>
      </div>
      <div class="icon-container" v-if="info.status === 'paused'">
        <img src="/static/icons/finish-white.svg" class="header-icon" />
        <span>{{ $t('predictions.paused')}}</span>
      </div>
      <div class="icon-container" v-else-if="info.status === 'resolved'">
        <img src="/static/icons/finish-white.svg" class="header-icon" />
        <span>{{ $t('predictions.ended')}}</span>
      </div>
      <div class="icon-container" v-else-if="info.status === 'canceled'">
        <img src="/static/icons/finish-white.svg" class="header-icon" />
        <span>{{ $t('predictions.canceled')}}</span>
      </div>
      <div class="icon-container" v-if="info.status !== 'canceled'">
        <img src="/static/icons/user-white.svg" class="header-icon" />
        <span>{{ $t('predictions.forecastsCount')}}: {{ info.forecastsCount }}</span>
      </div>
      <div class="icon-container" v-if="info.status !== 'canceled'">
        <img src="/static/icons/volume-white.svg" class="header-icon" />
        <span>{{ $t('predictions.volume')}}: <span>{{ info.poolSize}} {{ $t('general.aix')}} </span>
          <el-tooltip class="item" effect="dark" :content="$t('predictions.volumeInfoTooltip')" placement="top">
            <i class="el-icon-info"></i>
          </el-tooltip>
        </span>
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
  props: ['info']
}
</script>

<style lang="scss">
  @import '~helpers/variables';

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
      font-family: $font-secondary;

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
