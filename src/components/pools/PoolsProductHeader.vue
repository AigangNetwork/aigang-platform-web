<template>
  <div class="dataset-model-header-container">
    <div class="header-title-container">
      <div class="header-left-section">
        <div class="back-button-container">
            <router-link :to="{ name: backRouteName }" class="back-button"><i class="back-icon el-icon-arrow-left"></i>{{ $t('general.backToList')}}</router-link>
         </div>
        <h1>{{ info.title | truncate(128) }}</h1>
        <div class="info">

          <div class="icon-container" v-if="info.status === 'paused'">
            <img src="/static/icons/clock-white.svg" class="header-icon" />
            <span>{{ $t('pools.header.starts') }}:
              <Date :dateUtc="info.startDateUtc" format="YYYY-MM-DD HH:mm (UTC Z)" /></span>
          </div>

          <div class="icon-container" v-if="info.status === 'active'">
            <img src="/static/icons/finish-white.svg" class="header-icon" />
            <span>{{ $t('pools.header.ends') }}:
              <Date :dateUtc="info.endDateUtc" format="YYYY-MM-DD HH:mm (UTC Z)" /></span>
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
            <span>{{ $t('pools.header.currentPoolAmount') }}: {{ info.currentPoolSize }} / {{ info.poolGoalSize }} {{
              $t('general.aix') }}</span>
          </div>
        </div>

    </div>
    <img src="/static/icons/money-bag.svg" class="item-icon" />
  </div>
  </div>
</template>
<script>
import Date from '@/components/Date'

export default {
  components: { Date },
  props: ['info', 'backRouteName']
}
</script>

<style lang="scss" scoped>
  @import '~helpers/variables';
  @import '~helpers/mixins';

  @include aig-header;

  .header-title-container {
    background: $purple-gradient-down-top;
  }

  .info {
      margin-left: 20px;
      font-family: $font-secondary;

      .icon-container {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 5px;
        vertical-align: middle;

        .header-icon {
          width: 18px;
          height: 18px;
          margin-right: 8px;
        }
      }
  }

  .item-icon {
    height: 120px;
    margin-top: 40px;
  }

  .back-button {
    color: white;
  }

</style>
