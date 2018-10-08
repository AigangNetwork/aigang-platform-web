<template>
  <router-link :to="{ name: 'ForecastInfo', params: { id: item.id}}">
    <div class="aig-forecast-item">
      <div class="title">
        <h3>{{ item.predictionTitle }}</h3>
      </div>
      <div class="aig-forecast-item-body">
        <div class="aig-forecast-info-item">
          <div class="title">
            <p class="title">{{$t('predictions.forecast.amount')}}:</p>
          </div>
          <div class="content">{{ item.amount }} {{ $t('general.aix') }}</div>
        </div>
        <div class="aig-forecast-info-item-date">
          <div class="title">
            <p class="title">{{$t('predictions.forecast.created')}}:</p>
          </div>
          <div class="content"><Date :dateUtc="item.createdUtc" /></div>
        </div>
        <div class="aig-forecast-info-item-date">
          <div class="title">
            <p class="title">{{$t('predictions.forecast.results')}}:</p>
          </div>
          <div class="content" v-if="item.predictionStatus !== 'resolved'"><Date :dateUtc="item.resultDateUtc" /></div>
          <div class="content" v-if="item.predictionStatus === 'resolved'">{{ $t('predictions.forecast.announced') | uppercase }}</div>
        </div>
        <div class="aig-forecast-info-item-status">
          <div class="title">
            <p class="title">{{$t('predictions.forecast.status')}}:</p>
          </div>
          <div class="content">{{ status | uppercase }}</div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import Date from '@/components/Date'
import ForecastStatus from '@/components/mixins/ForecastStatus'

export default {
  mixins: [ForecastStatus],
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
    box-shadow: 0 0 30px 0 #e9f0f6;
    border: 1px solid #e5f0ff;
    transition: 200ms all;

    &:hover {
      border-left: 5px solid $yellow;
      padding-left: 30px;
    }

    .title {
      margin-bottom: 10px;
      h3 {
        margin: 0;
      }
    }

    .aig-forecast-item-body {
      width: 100%;
      display: flex;
      justify-content: space-between;

      .aig-forecast-info-item,
      .aig-forecast-info-item-date,
      .aig-forecast-info-item-status {
        padding: 0px 15px 0px 15px;

        .title {
          color: #9eb1c7;
          font-weight: 300;
          font-size: 11pt;
          word-wrap: break-word;
          max-width: 100%;
          margin-bottom: 5px;
          p {
            margin: 0px
          }
        }

        .content {
          font-family: "Roboto", sans-serif;
          font-weight: 300;
          color: $purple;
        }
      }
    }
  }
</style>
