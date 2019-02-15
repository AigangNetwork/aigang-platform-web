<template>
      <div class="product-details-body">
        <div class="aig-info-content">
          <h4 class="info-title">{{ $t('pools.pool.description') }}</h4>
          <vue-markdown class="markup-content" :html="false" :source="pool.description || $t('pools.pool.noDescription')"></vue-markdown>

          <h4 class="info-title">{{ $t('pools.pool.contractAddress') }}</h4>
          <p><a class="contract-address" target="_blank" :href="contractLink">{{ pool.poolContractAddress }}</a></p>

          <div v-if="pool.status === 'active'">
            <el-tooltip :disabled="isUserAuthenticated" :content="$t('pools.userNotLoggedIn')">
            <el-tooltip :disabled="!isContributingTimeEnded || !isUserAuthenticated" :content="$t('pools.pool.poolHasEnded')">
            <el-tooltip :disabled="!isPoolCapacityReached || isContributingTimeEnded || !isUserAuthenticated" :content="$t('pools.pool.poolCapacityReached')">
              <span class="wrapper el-button">
                <el-button :disabled="isContributingTimeEnded || isPoolCapacityReached || !isUserAuthenticated" @click="contribute" class="aig-button" type="primary">
                  {{ $t('pools.pool.contribute') }}
                </el-button>
              </span>
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
      return process.env.ETHERSCAN_ADDRESS + process.env.ADDRESS_PATH + this.pool.poolContractAddress
    },
    isContributingTimeEnded () {
      // 'Z' to specify UTC timezone
      const endTime = Date.parse(this.pool.endDateUtc + 'Z')
      return endTime <= Date.now()
    },
    isPoolCapacityReached () {
      return parseFloat(this.pool.goalPoolSize) <= parseFloat(this.pool.currentPoolSize)
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
