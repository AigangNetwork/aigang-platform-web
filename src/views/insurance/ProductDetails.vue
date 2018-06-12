<template>
  <div class="aig-container aig-view model-container" v-loading="loading">
    <Card class="product-card">
      <div slot="body">
        <ProductDetailsHeader :product="product" />
        <div class="product-details-body">
          <el-row class="input-section-title">{{ $t('insurance.product.description') }}</el-row>
          <p>{{ product.description }}</p>

          <el-row class="input-section-title">{{ $t('insurance.product.contractAddress') }}</el-row>
          <a class="contract-address" target="_blank" :href="contractLink">{{ product.contractAddress }}</a>

          <el-row class="input-section-title">{{ $t('insurance.product.termsAndConditions') }}</el-row>
          <p class="terms-and-conditions">{{ product.termsAndConditions }}</p>

          <el-button @click="displayDialog(true)" class="aig-button" type="primary">
            {{ $t('insurance.product.calculatePremium') }}
          </el-button>
        </div>
      </div>
    </Card>

    <DownloadAppDialog :displayDialog="displayDialog" :isVisible="dialogVisible" :calculatePremium="calculatePremium" />
  </div>

</template>
<script>
import Card from '@/components/Card'
import EndDate from '@/components/mixins/EndDate'
import ProductDetailsHeader from '@/components/insurance/ProductDetailsHeader'
import Dialog from '@/components/common/Dialog'
import DownloadAppDialog from '@/components/insurance/DownloadAppDialog'

export default {
  components: { Card, ProductDetailsHeader, Dialog, DownloadAppDialog },
  mixins: [EndDate],
  data () {
    return {
      loading: false,
      product: {},
      dialogVisible: false
    }
  },
  methods: {
    async fetchProduct () {
      this.loading = true

      try {
        const response = await this.axios.get('insure/products/' + this.$route.params.id)
        this.product = response.data.product
      } catch (e) {
        this.loading = false
      }

      this.loading = false
    },
    calculatePremium (imei) {
      this.dialogVisible = false
      this.loading = true

      setTimeout(() => {
        console.log('calculating with imei: ' + imei)
        this.loading = false
      }, 5000)
    },
    displayDialog (isVisible) {
      this.dialogVisible = isVisible
    }
  },
  computed: {
    contractLink () {
      return 'https://etherscan.io/address/' + this.product.contractAddress
    }
  },
  created () {
    this.fetchProduct()
  }
}

</script>
<style lang="scss">
  @import '~helpers/variables';

  .product-card.aig-card .aig-card-body {
    padding: 0 !important;
  }

  .product-details-body {
    padding: 0 53px;
  }

  .aig-button {
    margin: 40px auto;
  }

  .terms-and-conditions {
    overflow-y: scroll;
    max-height: 180px;
    border: 1px solid $light-blue;
    padding: 5px;
  }

  .product-card .contract-address {
    font-size: 18px;
    color: $light-blue;
    font-family: $font-secondary;
    word-wrap: break-word;
  }

  @media screen and (min-width: 100px) and (max-width: 710px) {
    .product-details-body {
      padding: 0 20px;
    }
  }
</style>
