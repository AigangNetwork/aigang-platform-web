<template>
  <div class="header-content">
    <div class="prediction-title">{{ info.title | truncate(128) }}</div>
    <div class="info">
      <div class="icon-container" v-if="info.status === 'paused'">
        <img src="/static/icons/clock-white.svg" class="header-icon" />
        <span>{{ $t('pools.header.starts') }}: <Date :dateUtc="info.startDateUtc" format="YYYY-MM-DD HH:mm (UTC Z)" /></span>
      </div>

      <div class="icon-container" v-if="info.status === 'active'">
        <img src="/static/icons/finish-white.svg" class="header-icon" />
        <span>{{ $t('pools.header.ends') }}: <Date :dateUtc="info.endDateUtc" format="YYYY-MM-DD HH:mm (UTC Z)" /></span>
      </div>

      <div class="icon-container" v-else-if="info.status === 'canceled'">
        <img src="/static/icons/finish-white.svg" class="header-icon" />
        <span>{{ $t('pools.header.canceled') }}</span>
      </div>

      <div class="icon-container" v-else-if="info.status === 'distributing'">
        <img src="/static/icons/finish-white.svg" class="header-icon" />
        <span>{{ $t('pools.header.distributing') }}</span>
      </div>

      <div class="icon-container" v-else-if="info.status === 'funded'">
        <img src="/static/icons/finish-white.svg" class="header-icon" />
        <span>{{ $t('pools.header.funded') }}</span>
      </div>

      <div class="icon-container" v-else-if="info.status === 'closed'">
        <img src="/static/icons/finish-white.svg" class="header-icon" />
        <span>{{ $t('pools.header.ended') }}</span>
      </div>

      <div class="icon-container" v-if="info.status !== 'canceled'">
        <img src="/static/icons/user-white.svg" class="header-icon" />
        <span>{{ $t('pools.header.contributions')}}: {{ info.contributions }}</span>
      </div>

      <div class="icon-container" v-if="info.status !== 'canceled'">
        <img src="/static/icons/volume-white.svg" class="header-icon" />
        <span>{{ $t('pools.header.currentPoolAmount') }}: {{ info.currentPoolSize }} / {{ info.poolGoalSize }} {{ $t('general.aix') }}</span>
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
