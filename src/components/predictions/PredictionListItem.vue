<template>
  <transition name="list" mode="out-in" appear>
  <router-link :to="{ name: 'PredictionInfo', params: { id: item.id, address: item.marketAddress}}" v-if="item && item.id">
    <div class="aig-data" :class="{ disabled: isDisabled }">
        <div class="aig-data-head">
          <div class="status" v-if="item.status === 'paused'">{{ $t('predictions.paused') }}</div>
          <div class="status" v-if="item.status === 'published'">{{ $t('predictions.votingTill') }}: <Date :dateUtc="item.forecastEndUtc" /></div>
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

  <div v-else>
    <div class="aig-data pools-product-item placeholder-item">
      <div class="aig-data-head">
        <div class="status">
          <PlaceholderBar class="placeholder" />
        </div>
        <div class="title">
          <PlaceholderBar class="placeholder" />
        </div>
      </div>
      <div class="aig-data-footer">
        <PlaceholderBar class="placeholder" />
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
import Date from '@/components/Date'
import PlaceholderBar from '@/components/common/PlaceholderBar'

export default {
  components: { Date, PlaceholderBar },
  props: ['item'],
  computed: {
    isDisabled () {
      return (
        this.item.status === 'paused' ||
        this.item.status === 'canceled' ||
        this.item.status === 'pendingPublish' ||
        this.item.status === 'pendingResolve' ||
        this.item.status === 'resolved'
      )
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~helpers/variables';
  @import '~helpers/mixins';

  .disabled {
    filter: grayscale(100%);
  }

  .status {

    .placeholder {
      height: 10px;
      width: 70%
    }
  }

  .aig-data-footer {
    .placeholder {
      height: 15px;
    }
  }

  .animated-background {
    width: 100%;
    height: 100%;
  }

  .placeholder {
    border-radius: 5px;
    margin: initial;
  }
</style>
