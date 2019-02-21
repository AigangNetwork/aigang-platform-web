<template>
  <router-link :to="{ name: 'ForecastInfo', params: { address: item.marketAddress, id: item.id}}">
    <div class="aig-list-item">
      <div class="title">{{ item.predictionTitle }}</div>
      <div class="aig-list-item-body">
        <div class="aig-list-info-item">
          <div class="title">
            <p class="title">{{$t('predictions.forecast.amount')}}:</p>
          </div>
          <div class="content">{{ item.amount }} {{ $t('general.aix') }}</div>
        </div>
        <div class="aig-list-info-item-date">
          <div class="title">
            <p class="title">{{$t('predictions.forecast.created')}}:</p>
          </div>
          <div class="content"><Date :dateUtc="item.createdUtc" /></div>
        </div>
        <div class="aig-list-info-item-date">
          <div class="title">
            <p class="title">{{$t('predictions.forecast.results')}}:</p>
          </div>
          <div class="content" v-if="item.predictionStatus !== 'resolved'"><Date :dateUtc="item.resultDateUtc" /></div>
          <div class="content" v-if="item.predictionStatus === 'resolved'">{{ $t('predictions.forecast.announced') | uppercase }}</div>
        </div>
        <div class="aig-list-info-item-status">
          <div class="title">
            <p class="title">{{$t('predictions.forecast.status')}}:</p>
          </div>
          <div class="content"><ForecastStatus :status="item.status"/></div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import Date from '@/components/Date'
import ForecastStatus from '@/components/predictions/ForecastStatus'

export default {
  components: {
    Date,
    ForecastStatus
  },
  props: ['item']
}
</script>

<style lang="scss" scoped>
  @import '~helpers/variables';
</style>
