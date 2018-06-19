<template>

  <div class="product-details-body">
    <el-row class="input-section-title">{{ $t('insurance.product.description') }}</el-row>
    <p>{{ product.description }}</p>

    <el-row class="input-section-title">{{ $t('insurance.product.contractAddress') }}</el-row>
    <a class="contract-address" target="_blank" :href="contractLink">{{ product.contractAddress }}</a>

    <el-row class="input-section-title">{{ $t('insurance.product.termsAndConditions') }}</el-row>
    <p class="terms-and-conditions">{{ product.termsAndConditions }}</p>

    <el-button @click="displayDialog(true)" class="aig-button" type="primary" v-if="product.state === 'Active'">
      {{ $t('insurance.product.calculatePremium') }}
    </el-button>
    <ProductDialog :displayDialog="displayDialog" :isVisible="dialogVisible" :calculatePremium="calculatePremium" />
  </div>

</template>
<script>
import ProductDialog from '@/components/insurance/ProductDialog'
import { mapGetters } from 'vuex'

export default {
  components: { ProductDialog },
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    calculatePremium (imei) {
      this.$store.dispatch('createNewPolicy', imei)
      this.dialogVisible = false
      this.$router.push({
        name: 'Policy'
      })
    },
    displayDialog (isVisible) {
      this.dialogVisible = isVisible
    }
  },
  computed: {
    ...mapGetters(['product']),
    contractLink () {
      return 'https://etherscan.io/address/' + this.product.contractAddress
    }
  }
}

</script>
