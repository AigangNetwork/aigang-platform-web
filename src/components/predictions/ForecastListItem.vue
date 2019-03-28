<template>
  <transition name="list" mode="out-in" appear>
  <router-link :to="{ name: 'ForecastInfo', params: { address: item.marketAddress, id: item.id}}" v-if="item && item.id">
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
          <div class="content" v-if="item.predictionStatus !== 'resolved'"><Date :dateUtc="item.forecastEndUtc" /></div>
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

  <div v-else>
    <div class="aig-list-item placeholder-container">
      <div class="title"> <PlaceholderBar class="placeholder" /> </div>
      <div class="aig-list-item-body">
        <div class="aig-list-info-item">
          <div class="title">
            <p class="title"><PlaceholderBar class="placeholder" /></p>
          </div>
          <div class="content"><PlaceholderBar class="placeholder" /></div>
        </div>
        <div class="aig-list-info-item-date">
          <div class="title">
            <p class="title"><PlaceholderBar class="placeholder" /></p>
          </div>
          <div class="content">
            <PlaceholderBar class="placeholder" />
          </div>
        </div>
        <div class="aig-list-info-item-date">
          <div class="title">
            <p class="title"> <PlaceholderBar class="placeholder" /> </p>
          </div>
          <div class="content" > <PlaceholderBar class="placeholder" /> </div>
        </div>
        <div class="aig-list-info-item-status">
          <div class="content">
            <div class="title"> <p class="title"> <PlaceholderBar class="placeholder" /> </p> </div>
            <PlaceholderBar class="placeholder" />
          </div>
        </div>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
import Date from '@/components/Date'
import ForecastStatus from '@/components/predictions/ForecastStatus'
import PlaceholderBar from '@/components/common/PlaceholderBar'

export default {
  components: { Date, ForecastStatus, PlaceholderBar },
  props: ['item']
}
</script>

<style lang="scss" scoped>
  @import '~helpers/variables';

  div.title > .placeholder {
    margin-left: 5px;
    margin-bottom: 25px;
    height: 15px;
  }

  .placeholder-container {
      &:hover {
        border: 1px solid #e5f0ff;
        padding-left: 20px;
      }

      .aig-list-item-body {
        min-height: 39px;
      }

      .title .title .placeholder {
        max-width: 80px;
        margin: initial;
        height: 10px;
      }

      .content .placeholder {
        max-width: 120px;
        margin: initial;
        height: 15px;
      }
  }

  @media screen and (min-width: 100px) and (max-width: 680px) {
    .title .title .placeholder {
      display: none
    }

    div.title > .placeholder {
      margin-left: 2px;
      margin-bottom: 5px;
    }

    .placeholder-container .aig-list-info-item-status .content {

      .placeholder {
        margin-left: 2px;
      }

      .title {
          display: none
      }
    }

    .aig-list-item-body {
        min-height: 10px;
    }

    .aig-list-item.placeholder-container {
      min-height: 167px;
    }
  }

</style>
