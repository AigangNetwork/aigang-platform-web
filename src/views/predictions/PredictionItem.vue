<template>
  <router-link :to="{ name: 'PredictionInfo', params: { id: item.id}}">
    <div class="aig-data">
        <div class="aig-data-head">
          <div class="status" v-if="item.status === 'published'">{{ $t('predictions.predictionItem.votingTill') }}: <Date :dateUtc="item.forecastEndUtc" /></div>
          <div class="status" v-if="item.status === 'paused'">{{ $t('predictions.predictionItem.paused') }}</div>
          <div class="status" v-if="item.status === 'canceled'">{{ $t('predictions.predictionItem.canceled') }}</div>
          <div class="status" v-if="item.status === 'resolved'">{{ $t('predictions.predictionItem.ended') }}</div>
          <div class="title">{{  item.title | truncate(35) }}</div>
        </div>
        <div class="aig-data-body">
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

  .aig-data {
    @include transition;
    padding: 20px 20px 10px 20px;
    background: white;
    margin-left: 10px;
    margin-right: 10px;
    box-shadow: 0 0 30px 0 #e9f0f6;
    border: 1px solid $light-border-blue;
    height: 245px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .aig-data-body {
      height: 100%;
      max-height: 110px;
      p {
        margin: 0;
        max-height: 50px;
        font-size: 14px;
      }
    }
    .aig-data-head {
      justify-content: space-between;
      margin-top: 0;
      width: 100%;
    }
    .aig-data-footer {
      border-top: 1px solid $light-border-blue;
      height: 40px;
      width: 100%;
      font-size: 0;
      display: flex;
      padding-top: 5px;
      display: flex;
      justify-content: space-between;
      height: 30px;
      background: white;

      .aig-footer-container {
        justify-content: left;
        display: flex;
        height: 100%;
        .label {
          font-family: $font-secondary;
          margin-left: 5px;
          display: flex;
          span {
            margin-left: 2px;
          }
        }
      }
      .aig-footer-container-right {
        justify-content: right;
        @extend .aig-footer-container;
      }
    }

    .status {
      color: $light-grey;
      font-size: 10pt;
      margin-bottom: 5px;
    }

    .title {
      font-family: $font-primary;
      color: $purple;
      font-weight: 600;
      font-size: 17pt;
      word-wrap: break-word;
      max-width: 100%;
    }

    .desc {
      min-height: 20px;
      line-height: 1.3;
      font-size: 13px;
      word-wrap: break-word;
      max-width: 100%;
    }
  }

  /* Tablet */

  @media screen and (min-width: 680px) and (max-width: 1024px) {
    .aig-data .aig-data-footer .aig-footer-container-right {
      padding-left: 0px;
    }
  }

  @media screen and (min-width: 100px) and (max-width: 680px) {
    .aig-data {
      height: 245px;
      padding: 18px;

      .aig-data-head {
        .title {
          width: 100%;
          word-wrap: break-word;
        }

      }

      .aig-data-body {
        p {
          font-size: 13px;
        }
      }
      .aig-data-footer {
        justify-content: space-between;
        .aig-footer-container-right {
          padding-left: 0;
        }
      }
    }
  }
</style>
