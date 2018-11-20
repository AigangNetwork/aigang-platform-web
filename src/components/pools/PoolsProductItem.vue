<template>
  <router-link :to="{ name: 'PoolsProduct', params: { id: product.id }}">
      <div class="aig-list-item">
        <div class="title">{{ product.title }}</div>
        <div class="aig-list-item-body">
          <div class="aig-list-info-item">
            <div class="title">
              <p class="title">{{ $t('pools.products.invested') }}:</p>
            </div>
            <div class="content">{{ product.contributions }}</div>
          </div>

          <div class="aig-list-info-item">
            <div class="title">
              <p class="title">{{ $t('pools.products.currentPoolSize') }}:</p>
            </div>
            <div class="content">{{ product.currentPoolSize }} {{ $t('general.aix') }}</div>
          </div>

          <div class="aig-list-info-item-date" v-if="product.status.toUpperCase() === 'PAUSED'">
            <div class="title">
              <p class="title">{{ $t('pools.products.start') }}:</p>
            </div>
            <div class="content"><Date :dateUtc="product.startDateUtc" /></div>
          </div>

          <div class="aig-list-info-item-date" v-else-if="product.status.toUpperCase() === 'ACTIVE'">
            <div class="title">
              <p class="title">{{ $t('pools.products.end') }}:</p>
            </div>
            <div class="content"><Date :dateUtc="product.endDateUtc" /></div>
          </div>

          <div class="aig-list-info-item-status">
            <div class="title">
              <p class="title">{{ $t('pools.products.status') }}:</p>
            </div>
            <div class="content">{{ status | uppercase }}</div>
          </div>
        </div>
      </div>
  </router-link>
</template>
<script>
import Date from '@/components/Date'
import PoolStatus from '@/components/mixins/PoolStatus'

export default {
  props: ['product'],
  mixins: [PoolStatus],
  components: {
    Date
  }
}
</script>
<style lang="scss" scoped>
  @import '~helpers/variables';
</style>
