<template>

  <div class="product-details-body" >
    <div class="aig-info-content">
      <h4 class="info-title">{{ $t('pools.contribution.description') }}</h4>
      <vue-markdown class="markup-content" :html="false" :source="contribution.poolDescription || $t('pools.contribution.noDescription')"></vue-markdown>

      <h4 class="info-title">{{ $t('pools.contribution.contractAddress') }}</h4>
      <p><a class="contract-address" target="_blank" :href="contractLink">{{ contribution.poolContractAddress }}</a></p>

      <h4 class="info-title">{{ $t('pools.contribution.details') }}</h4>
      <div>
        <p>{{ $t('pools.portfolioInfo.status') }}:
          <ContributionStatus :status="contribution.status" />
        </p>
        <p>{{ $t('pools.contribution.yourAmount') }}:
          <span class="value">{{ contribution.amount }} {{ $t('general.aix') }}</span>
        </p>
        <p v-if="showPayout">{{ $t('pools.contribution.paidoutAmount') }}:
          <span class="value">{{ contribution.payout }} {{ $t('general.aix') }}</span>
        </p>

      </div>

      <div v-if="isContributionAvailableRefund">
        <h4 class="info-title">{{ $t('pools.contribution.refundContribution') }}</h4>
        <p>{{ $t('pools.contribution.refundContributionDescription')}}</p>
        <p>{{ $t('pools.contribution.refundAmount')}}: <span class="value">{{ contribution.amount }} {{
            $t('general.aix') }}</span></p>
        <el-tooltip :disabled="investButtonEnabled" :content="$t('pools.userNotLoggedIn')">
          <span class="wrapper el-button">
            <el-button :disabled="!investButtonEnabled" @click="refund" class="aig-button" type="primary">
              {{ $t('pools.contribution.refund') }}
            </el-button>
          </span>
        </el-tooltip>
      </div>

      <div v-if="isContributionAvailablePayout">
        <h4 class="info-title">{{ $t('pools.contribution.payoutContribution') }}</h4>
        <p>{{ $t('pools.contribution.payoutContributionDescription')}}</p>
        <p>{{ $t('pools.contribution.payoutAmount')}}: <span class="value">{{ contribution.payout }} {{
            $t('general.aix') }}</span></p>
        <el-tooltip :disabled="investButtonEnabled" :content="$t('pools.userNotLoggedIn')">
          <span class="wrapper el-button">
            <el-button :disabled="!investButtonEnabled" @click="payout" class="aig-button" type="primary">
              {{ $t('pools.contribution.payout') }}
            </el-button>
          </span>
        </el-tooltip>
      </div>

      <ContributionDeleteSection v-if="isDeleteAllowed" />

    </div>
      <PaymentConfirmationDialog
      :isVisible="isPaymentDialogVisible && !transactionError"
      :displayDialog="displayPaymentDialog"
      :content="$t('pools.pool.paymentInfo.metamaskAlert')"
      :txHash="transactionHash" :title="$t('pools.pool.paymentInfo.title')"
      :bodyText="$t('pools.pool.paymentInfo.body')"
      :route="portfolioRoute"
      :btnText="$t('pools.pool.paymentInfo.buttons.goBack')" />
  </div>

</template>
<script>

import ConfirmContributionDialog from '@/components/pools/ConfirmContributionDialog'
import VueMarkdown from 'vue-markdown'
import ScrollableMarkupText from '@/components/insurance/ScrollableMarkupText'
import PaymentConfirmationDialog from '@/components/common/PaymentConfirmationDialog'
import ContributionDeleteSection from '@/components/pools/ContributionDeleteSection'
import ContributionStatus from './ContributionStatus'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('pools')

export default {
  components: {
    ConfirmContributionDialog,
    VueMarkdown,
    ScrollableMarkupText,
    PaymentConfirmationDialog,
    ContributionDeleteSection,
    ContributionStatus
  },
  props: ['contribution'],
  data () {
    return {
      isConfirmContributionDialogVisible: false,
      investButtonDisabled: true,
      isPaymentDialogVisible: false,
      portfolioRoute: '/pools/portfolio'
    }
  },
  computed: {
    ...mapGetters([ 'transactionError', 'transactionHash' ]),
    contractLink () {
      return process.env.ETHERSCAN_ADDRESS + process.env.ADDRESS_PATX + this.contribution.poolContractAddress
    },
    isContributionAvailablePayout () {
      if (this.contribution.status) {
        return this.contribution.status.toUpperCase() === 'AVAILABLEPAYOUT'
      }
      return ''
    },
    showPayout () {
      if (this.contribution.status) {
        return this.contribution.status.toUpperCase() === 'PENDINGPAYOUT' ||
        this.contribution.status.toUpperCase() === 'REWARDPAIDOUT'
      }
      return ''
    },
    isContributionAvailableRefund () {
      if (this.contribution.status) {
        return this.contribution.status.toUpperCase() === 'AVAILABLEREFUND'
      }
      return ''
    },
    investButtonEnabled () {
      return !!((this.$store.getters['user/isAuthenticated'] && this.$store.getters['user/isWeb3Enabled']))
    },
    isDeleteAllowed () {
      if (this.contribution.status) {
        return this.contribution.status.toUpperCase() === 'PENDINGPAYMENT' && !this.contribution.txId
      }
      return ''
    }
  },
  methods: {
    displayPaymentDialog (value) {
      this.isPaymentDialogVisible = value
    },
    async payout () {
      this.isPaymentDialogVisible = true

      await this.$store.dispatch('pools/payoutContribution', {
        contributionId: this.contribution.id,
        poolId: this.contribution.poolId,
        poolContractAddress: this.contribution.poolContractAddress
      })
    },
    async refund () {
      this.isPaymentDialogVisible = true

      await this.$store.dispatch('pools/refundContribution', {
        contributionId: this.contribution.id,
        poolId: this.contribution.poolId,
        poolContractAddress: this.contribution.poolContractAddress
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~helpers/variables';
  @import '~helpers/mixins';

  .product-details-body {
    margin-bottom: 40px;
  }
</style>
