<template>

  <div class="product-details-body">
    <h4 class="info-title">{{ $t('insurance.product.description') }}</h4>
    <vue-markdown class="markup-content" :html="false" :source="product.description"></vue-markdown>

    <h4 class="info-title">{{ $t('insurance.product.contractAddress') }}</h4>
    <a class="contract-address" target="_blank" :href="contractLink">{{ product.contractAddress }}</a>

    <h4 class="info-title">{{ $t('insurance.product.termsAndConditions') }}</h4>
    <ScrollableMarkupText class="scrollable-text" :text="product.termsAndConditions" @scrolledToBottom="onScrolledToBottom" />

    <template v-if="product.state === 'active'">

    <el-tooltip v-if="!$store.getters['user/isAuthenticated']" :disabled="$store.getters['user/isAuthenticated']" :content="$t('insurance.product.logInToCalculateInsurancePrice')">
      <span class="wrapper el-button">
        <el-button :disabled="true" class="aig-button" type="primary">
          {{ $t('insurance.product.calculateInsurancePrice') }}
        </el-button>
      </span>
    </el-tooltip>

      <el-tooltip v-else-if="product.isPoolLimitReached" :content="$t('insurance.product.productPoolLimitReacher')">
        <span class="wrapper el-button">
          <el-button :disabled="true" class="aig-button" type="primary">
            {{ $t('insurance.product.calculateInsurancePrice') }}
          </el-button>
        </span>
      </el-tooltip>

      <el-tooltip v-else-if="product.isPoliciesLimitReached" :content="$t('insurance.product.policiesLimitReached')">
        <span class="wrapper el-button">
          <el-button :disabled="true" class="aig-button" type="primary">
            {{ $t('insurance.product.calculateInsurancePrice') }}
          </el-button>
        </span>
      </el-tooltip>

      <el-tooltip v-else :disabled="!calculateButtonDisabled" :content="$t('insurance.product.agreeWithTermsAndConditions')">
        <span class="wrapper el-button">
          <el-button :disabled="calculateButtonDisabled" @click="displayDialog(true)" class="aig-button" type="primary">
            {{ $t('insurance.product.calculateInsurancePrice') }}
          </el-button>
        </span>
      </el-tooltip>

      <ProductDialog :displayDialog="displayDialog" :isVisible="dialogVisible" />

    </template>
  </div>
</template>
<script>
import ProductDialog from '@/components/insurance/ProductDialog'
import ScrollableMarkupText from '@/components/insurance/ScrollableMarkupText'
import VueMarkdown from 'vue-markdown'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('insurance')

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
    ...mapGetters(['product']),
    contractLink () {
      return process.env.ETHERSCAN_ADDRESS + process.env.ADDRESS_PATH + this.product.contractAddress
    }
  }
}

</script>
<style lang="scss">
  .product-details-body {
    padding-bottom: 40px;

    .scrollable-text {
      height: 200px;
      margin-bottom: 20px;
    }
  }
</style>
