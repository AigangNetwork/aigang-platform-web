<template>

  <div class="product-details-body">
    <el-row class="input-section-title">{{ $t('insurance.product.description') }}</el-row>
    <vue-markdown class="markup-content" :html="false" :source="product.description"></vue-markdown>

    <el-row class="input-section-title">{{ $t('insurance.product.contractAddress') }}</el-row>
    <a class="contract-address" target="_blank" :href="contractLink">{{ product.contractAddress }}</a>

    <el-row class="input-section-title">{{ $t('insurance.product.termsAndConditions') }}</el-row>
    <ScrollableMarkupText class="scrollable-text" :text="product.termsAndConditions" @scrolledToBottom="onScrolledToBottom"/>

    <el-tooltip v-if="!isAuthenticated" :disabled="isAuthenticated" :content="$t('insurance.product.logInToCalculatePremium')">
      <span class="wrapper el-button">
        <el-button :disabled="true" class="aig-button" type="primary">
          {{ $t('insurance.product.calculatePremium') }}
        </el-button>
      </span>
    </el-tooltip>

    <el-tooltip v-else :disabled="!calculateButtonDisabled" :content="$t('insurance.product.agreeWithTermsAndConditions')">
      <span class="wrapper el-button">
        <el-button :disabled="calculateButtonDisabled" @click="displayDialog(true)" class="aig-button" type="primary">
          {{ $t('insurance.product.calculatePremium') }}
        </el-button>
      </span>
    </el-tooltip>

    <ProductDialog :displayDialog="displayDialog" :isVisible="dialogVisible" />
  </div>

</template>
<script>
import ProductDialog from '@/components/insurance/ProductDialog'
import ScrollableMarkupText from '@/components/insurance/ScrollableMarkupText'
import VueMarkdown from 'vue-markdown'
import { mapGetters } from 'vuex'

export default {
  components: {
    ProductDialog,
    VueMarkdown,
    ScrollableMarkupText
  },
  data () {
    return {
      dialogVisible: false,
      calculateButtonDisabled: true
    }
  },
  methods: {
    displayDialog (isVisible) {
      this.dialogVisible = isVisible
    },
    onScrolledToBottom () {
      this.calculateButtonDisabled = false
    }
  },
  computed: {
    ...mapGetters(['product', 'isAuthenticated']),
    contractLink () {
      return 'https://etherscan.io/address/' + this.product.contractAddress
    }
  }
}
</script>
<style lang="scss">
  .product-details-body {
    .scrollable-text {
      height: 200px;
    }
  }
</style>
