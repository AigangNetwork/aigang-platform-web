<template>
  <router-link :to="{ name: 'PoolsProduct', params: { id: item.id }}">
    <div class="aig-data">
      <div class="aig-data-head">
        <div class="status" v-if="item.status === 'active'">{{ $t('pools.products.activeTill') }}: <Date :dateUtc="item.endDateUtc" /></div>
        <div class="status" v-if="item.status === 'distributing'">{{ $t('pools.products.distributing') }}</div>
        <div class="status" v-if="item.status === 'funded'">{{ $t('pools.products.funded') }}</div>
        <div class="status" v-if="item.status === 'paused'">{{ $t('pools.products.paused') }}</div>
        <div class="status" v-if="item.status === 'canceled'">{{ $t('pools.products.canceled') }}</div>
        <div class="status" v-if="item.status === 'closed'">{{ $t('pools.products.closed') }}</div>
        <div class="title">{{  item.title | truncate(85) }}</div>
        <div class="desc">
          <p>{{ item.description | truncate(60) }}</p>
        </div>
      </div>
      <div class="aig-data-footer">
        <div class="aig-footer-container">
          <img src="/static/icons/volume-purple.svg" width="18" alt="volume"/>
          <span class="label">{{ item.currentPoolSize || 0 }} {{ $t('general.aix')}}</span>
        </div>
        <div class="aig-footer-container-right">
          <img src="/static/icons/user-purple.svg" width="18" alt="contributions"/>
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

</style>
