<template>
  <router-link :to="{ name: 'PredictionInfo', params: { id: item.id}}">
    <div class="aig-data">
        <div class="aig-data-head">
          <div class="status" v-if="item.status === 'paused'">{{ $t('predictions.paused') }}</div>
          <div class="status" v-if="item.status === 'pendingPublish'">{{ $t('predictions.votingStarts') }}: <Date :dateUtc="item.forecastStartUtc" /></div>
          <div class="status" v-if="item.status === 'published'">{{ $t('predictions.votingTill') }}: <Date :dateUtc="item.forecastEndUtc" /></div>
          <div class="status" v-if="item.status === 'pendingResolve'">{{ $t('predictions.votingEnded') }}</div>
          <div class="status" v-if="item.status === 'resolved'">{{ $t('predictions.ended') }}</div>
          <div class="status" v-if="item.status === 'canceled'">{{ $t('predictions.canceled') }}</div>
          <div class="title">{{  item.title | truncate(85) }}</div>
          <div class="desc">
            <p>{{ item.description | truncate(60) }}</p>
          </div>
        </div>
        <div class="aig-data-footer">
          <div class="aig-footer-container">
            <img src="/static/icons/volume-purple.svg" width="18" alt="volume"/>
            <span class="label">{{ item.poolSize || 0 }} {{ $t('general.aix')}}</span>
          </div>
          <div class="aig-footer-container-right">
            <img src="/static/icons/user-purple.svg" width="18" alt="predictions"/>
            <span class="label">{{ item.forecastsCount || 0 }}</span>
          </div>
        </div>
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
  @import '~helpers/mixins';

</style>
