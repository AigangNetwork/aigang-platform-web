<template>
      <div class="product-details-body">
        <div class="aig-info-content">
          <h4 class="info-title">{{ $t('pools.pool.description') }}</h4>
          <vue-markdown class="markup-content" :html="false" :source="pool.description || $t('pools.pool.noDescription')"></vue-markdown>

          <h4 class="info-title">{{ $t('pools.pool.contractAddress') }}</h4>
          <p><a class="contract-address" target="_blank" :href="contractLink">{{ pool.poolContractAddress }}</a></p>

          <div v-if="pool.status === 'active'">
            <h4 class="info-title">{{ $t('pools.pool.termsAndConditions') }}</h4>
            <ScrollableMarkupText class="scrollable-text" :text="pool.termsAndConditions" @scrolledToBottom="onScrolledToBottom" />

            <el-tooltip :disabled="isUserAuthenticated" :content="$t('pools.userNotLoggedIn')">
            <el-tooltip :disabled="!investButtonDisabled || !isUserAuthenticated" :content="$t('pools.pool.agreeWithTermsAndConditions')">
            <el-tooltip :disabled="!isContributingTimeEnded || investButtonDisabled || !isUserAuthenticated" :content="$t('pools.pool.poolHasEnded')">
            <el-tooltip :disabled="!isPoolCapacityReached || ContributingTimeEnded || investButtonDisabled || !isUserAuthenticated" :content="$t('pools.pool.poolCapacityReached')">
              <span class="wrapper el-button">
                <el-button :disabled="investButtonDisabled || isContributingTimeEnded || isPoolCapacityReached || !isUserAuthenticated" @click="contribute" class="aig-button" type="primary">
                  {{ $t('pools.pool.invest') }}
                </el-button>
              </span>
            </el-tooltip>
            </el-tooltip>
            </el-tooltip>
            </el-tooltip>
          </div>

          <ConfirmContributionDialog
            :isVisible="isConfirmContributionDialogVisible"
            :displayDialog="displayConfirmContributionDialog"
            :maxAllowedAmount="maxAllowedAmount"
            @addContribution="onAddContribution" />

          <PaymentConfirmationDialog
            :isVisible="isPaymentDialogVisible && !transactionError"
            :displayDialog="displayPaymentDialog"
            :content="$t('pools.pool.paymentInfo.metamaskAlert')"
            :txHash="transactionHash"
            :title="$t('pools.pool.paymentInfo.title')"
            :bodyText="$t('pools.pool.paymentInfo.body')"
            :route="portfolioRoute"
            :btnText="$t('pools.pool.paymentInfo.buttons.goBack')" />

        </div>
      </div>
</template>
<script>

import ConfirmContributionDialog from '@/components/pools/ConfirmContributionDialog'
import VueMarkdown from 'vue-markdown'
import ScrollableMarkupText from '@/components/insurance/ScrollableMarkupText'
import PaymentConfirmationDialog from '@/components/common/PaymentConfirmationDialog'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('pools')

export default {
  components: {
    ConfirmContributionDialog,
    VueMarkdown,
    ScrollableMarkupText,
    PaymentConfirmationDialog
  },
  props: ['pool'],
  data () {
    return {
      isConfirmContributionDialogVisible: false,
      investButtonDisabled: true,
      isPaymentDialogVisible: false,
      portfolioRoute: '/pools/portfolio'
    }
  },
  computed: {
    ...mapGetters([
      'transactionError',
      'transactionHash'
    ]),
    maxAllowedAmount () {
      const numbersAfterPointer = 6
      return Math.round((this.pool.goalPoolSize - this.pool.currentPoolSize) * Math.pow(10, numbersAfterPointer)) / Math.pow(10, numbersAfterPointer)
    },
    contractLink () {
      return process.env.ETHERSCAN_ADDRESS + process.env.ADDRESS_PATX + this.pool.poolContractAddress
    },
    isContributingTimeEnded () {
      // 'Z' to specify UTC timezone
      const endTime = Date.parse(this.pool.endDateUtc + 'Z')
      console.log(endTime)
      return endTime <= Date.now()
    },
    isPoolCapacityReached () {
      return this.pool.goalPoolSize <= this.pool.currentPoolSize
    },
    isUserAuthenticated () {
      return this.$store.getters['user/isAuthenticated'] && this.$store.getters['user/isWeb3Enabled']
    }
  },
  methods: {
    contribute () {
      this.displayConfirmContributionDialog(true)
    },
    displayConfirmContributionDialog (value) {
      this.isConfirmContributionDialogVisible = value
    },
    async onAddContribution (amount) {
      this.displayConfirmContributionDialog(false)

      if (amount >= this.$store.getters['user/aixBalance']) {
        this.$store.dispatch('showInsufficientBalanceDialog', true)
        return
      }

      await this.$store.dispatch('pools/addContribution', {
        amount,
        poolId: this.$route.params.id,
        poolContractAddress: this.pool.poolContractAddress
      })

      this.displayPaymentDialog(true)
    },
    onScrolledToBottom () {
      this.investButtonDisabled = false
    },
    displayPaymentDialog (value) {
      this.isPaymentDialogVisible = value
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~helpers/variables';
  @import '~helpers/mixins';
</style>
