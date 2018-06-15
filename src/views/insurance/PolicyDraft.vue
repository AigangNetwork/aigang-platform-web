<template>

  <div class="product-details-body">
    <el-row class="input-section-title">{{ $t('insurance.product.deviceId') }}</el-row>
    <p>{{ policy.imei }}</p>

    <el-row class="input-section-title">{{ $t('insurance.product.wearLevel') }}</el-row>
    <p>{{ policy.wearLevel }}</p>

    <el-row class="input-section-title">{{ $t('insurance.product.calculatedPremium') }}</el-row>
    <p>{{ policy.premium }}</p>

    <el-row class="input-section-title">{{ $t('insurance.product.coefficients') }}</el-row>
    <p>{{ policy.utcStart }}</p>

    <el-row class="input-section-title">{{ $t('insurance.product.payout') }}</el-row>
    <p>{{ policy.utcEnd }}</p>

    <el-row class="input-section-title">{{ $t('insurance.product.fees') }}</el-row>
    <p>{{ policy.fees }}</p>

    <el-button class="aig-button" type="primary">
      {{ $t('insurance.product.insure') }}
    </el-button>
  </div>
</template>
<script>
import Card from '@/components/Card'
import { mapGetters } from 'vuex'

export default {
  components: {
    Card
  },
  computed: { ...mapGetters(['policy']) }
}
</script>
