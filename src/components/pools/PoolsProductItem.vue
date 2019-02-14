
<template>
  <router-link :to="{ name: 'PoolsProduct', params: { id: item.id, address: item.poolContractAddress }}">
    <div class="aig-data pools-product-item" :class="{ active: item.status === 'active'}">
        <div class="aig-data-head">
          <div class="status" v-if="item.status === 'active'">{{ $t('pools.products.activeTill') }}: <Date :dateUtc="item.endDateUtc" /></div>
          <div class="status" v-if="item.status === 'distributing'">{{ $t('pools.products.distributing') }}</div>
          <div class="status" v-if="item.status === 'funding'">{{ $t('pools.products.funding') }}</div>
          <div class="status" v-if="item.status === 'paused'">{{ $t('pools.products.paused') }}</div>
          <div class="status" v-if="item.status === 'canceled'">{{ $t('pools.products.canceled') }}</div>
          <div class="status" v-if="item.status === 'closed'">{{ $t('pools.products.closed') }}</div>
          <div class="title">{{  item.title | truncate(85) }}</div>
        </div>
        <img src="/static/icons/money-bag.svg" class="item-icon" />
        <div class="aig-data-footer">
          <div class="aig-footer-container">
            <img src="/static/icons/volume-white.svg" width="18" alt="volume"/>
            <span class="label">{{ item.currentPoolSize || 0 }} {{ $t('general.aix')}}</span>
          </div>
          <div class="aig-footer-container-right">
            <img src="/static/icons/user-white.svg" width="18" alt="contributions"/>
            <span class="label">{{ item.contributions || 0 }}</span>
          </div>
        </div>
    </div>
  </router-link>
</template>
<script>
import Date from '@/components/Date'
import PoolStatus from '@/components/mixins/PoolStatus'

export default {
  props: ['item'],
  mixins: [PoolStatus],
  components: {
    Date
  }
}
</script>
<style lang="scss" scoped>
  @import '~helpers/variables';
  @import '~helpers/mixins';

  .pools-product-item {
    background: $grey-gradient-down-top;
    border: none;
    text-align: center;

    &.active {
      background: $purple-gradient-down-top
    }

    .title, .desc p, .label, .status {
      color: white;
    }

    .aig-data-footer {
      background: none;
      border-top: 1px solid white;

      .aig-data-footer-container {
        display: flex;
        align-items: center;
      }
    }

    .aig-data-head {
      text-align: left;
    }

    .item-icon {
      height: 120px;
      margin: 10px auto;
    }
  }

  .aig-footer-container, .aig-footer-container-right {
    align-items: center;
  }

  .status {
    font-family: $font-secondary;
  }

  @media screen and (min-width: 100px) and (max-width: 680px) {
    .pools-product-item .item-icon {
      height: 90px;
    }
  }
</style>
