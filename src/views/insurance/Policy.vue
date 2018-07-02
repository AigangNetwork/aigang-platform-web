<template>
  <div class="aig-container aig-view">
    <transition name="fade" mode="out-in">
      <Card class="product-card">
        <div slot="body" class="product-details-body">
          <el-row class="input-section-title">{{ $t('insurance.policy.deviceId') }}</el-row>
          <p>{{ policy.imei }}</p>

          <el-row class="input-section-title">{{ $t('insurance.product.currentWearLevel') }}</el-row>
          <p>{{ policy.wearLevel }}</p>

          <el-row class="input-section-title">{{ $t('insurance.product.calculatedPremium') }}</el-row>
          <p>{{ policy.premium }}</p>

          <el-row class="input-section-title">{{ $t('insurance.product.startTime') }}</el-row>
          <p>{{ policy.startUtc }}</p>

          <el-row class="input-section-title">{{ $t('insurance.product.endTime') }}</el-row>
          <p>{{ policy.endUtc }}</p>

          <el-row class="input-section-title">{{ $t('insurance.product.payout') }}</el-row>
          <p>{{ policy.utcEnd }}</p>

          <el-row class="input-section-title">{{ $t('insurance.product.fee') }}</el-row>
          <p>{{ policy.fee }}</p>

          <el-button class="aig-button" type="primary" @click.prevent.native="createPolicy">
            {{ $t('insurance.product.insure') }}
          </el-button>
        </div>
      </Card>
    </transition>
  </div>

</template>
<script>
import Card from '@/components/Card'
import { mapGetters } from 'vuex'

export default {
  components: { Card },
  computed: { ...mapGetters(['policy']) },
  methods: {
    createPolicy () {

    }
  }
}
</script>
<style lang="scss">
  .product-card.aig-card .aig-card-body {
    margin-top: 44px !important;
  }
</style>
