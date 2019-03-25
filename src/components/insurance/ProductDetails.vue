<template>
  <div class="product-details-body">
    <h4 class="info-title">{{ $t('insurance.product.description') }}</h4>
    <vue-markdown class="markup-content" :html="false" :source="product.description"></vue-markdown>

    <h4 class="info-title">{{ $t('insurance.product.contractAddress') }}</h4>
    <a class="contract-address" target="_blank" :href="contractLink">{{ product.address }}</a>

    <template>
      <el-tooltip v-if="product.isPoolLimitReached" :content="$t('insurance.product.productPoolLimitReached')">
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

      <el-tooltip v-else-if="isCampaignNotStartedYet" :content="$t('insurance.product.campaignNotStartedYet')">
        <span class="wrapper el-button">
          <el-button :disabled="true" @click="displayDialog(true)" class="aig-button" type="primary">
            {{ $t('insurance.product.calculateInsurancePrice') }}
          </el-button>
        </span>
      </el-tooltip>

      <el-tooltip v-else-if="isCampaignEnded" :content="$t('insurance.product.campaignEnded')">
        <span class="wrapper el-button">
          <el-button :disabled="true" @click="displayDialog(true)" class="aig-button" type="primary">
            {{ $t('insurance.product.calculateInsurancePrice') }}
          </el-button>
        </span>
      </el-tooltip>

      <span class="wrapper el-button" v-else-if="isCampaignIsRunning">
        <el-button @click="displayDialog(true)" class="aig-button" type="primary">
          {{ $t('insurance.product.calculateInsurancePrice') }}
        </el-button>
      </span>

      <ProductDialog :displayDialog="displayDialog" :isVisible="dialogVisible" />
    </template>
  </div>
</template>

<script>
import moment from 'moment'
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
      dialogVisible: false
    }
  },
  methods: {
    displayDialog (isVisible) {
      this.dialogVisible = isVisible
    }
  },
  computed: {
    ...mapGetters(['product']),
    contractLink () {
      return process.env.ETHERSCAN_ADDRESS + process.env.ADDRESS_PATH + this.product.address
    },
    isCampaignIsRunning () {
      const currentDate = moment.utc()
      const campaignStartDate = moment.utc(this.product.startDateUtc)
      const campaignEndDate = moment.utc(this.product.endDateUtc)
      return currentDate.isAfter(campaignStartDate) && currentDate.isBefore(campaignEndDate)
    },
    isCampaignEnded () {
      const currentDate = moment.utc()
      const campaignEndDate = moment.utc(this.product.endDateUtc)
      return currentDate.isAfter(campaignEndDate)
    },
    isCampaignNotStartedYet () {
      const currentDate = moment.utc()
      const campaignStartDate = moment.utc(this.product.startDateUtc)
      return currentDate.isBefore(campaignStartDate)
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
