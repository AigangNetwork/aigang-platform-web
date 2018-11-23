<template>
  <div class="aig-container aig-view aig-info" v-loading="$store.getters.loading">
    <div class="aig-info-header" v-if="isDataLoaded">
      <div class="back-button-container">
        <router-link :to="{ name: 'Portfolio' }" class="back-button">{{ $t('general.backToList')}}</router-link>
      </div>
      <div class="aig-info-header-content">
        <PoolProductHeader :info="headerInfo" />
      </div>
    </div>

    <div class="aig-info-content-container" v-if="isDataLoaded">
      <div class="aig-info-content">
        <h4 class="info-title">{{ $t('pools.contribution.description') }}</h4>
        <vue-markdown class="markup-content" :html="false" :source="currentContribution.poolDescription || $t('pools.contribution.noDescription')"></vue-markdown>

        <div v-if="isContributionDraft">
          <h4 class="info-title">{{ $t('pools.contribution.payContribution') }}</h4>
          <p>{{ $t('pools.contribution.payContributionDescription')}}</p>
          <p>{{ $t('pools.contribution.amount')}}: <span class="value">{{ currentContribution.amount }} {{ $t('general.aix') }}</span></p>
          <el-tooltip :disabled="investButtonEnabled" :content="$t('pools.userNotLoggedIn')">
            <span class="wrapper el-button">
              <el-button :disabled="!investButtonEnabled" @click="pay" class="aig-button" type="primary">
                {{ $t('pools.contribution.pay') }}
              </el-button>
            </span>
          </el-tooltip>
        </div>

        <div v-if="isContributionAvailableRefund">
          <h4 class="info-title">{{ $t('pools.contribution.refundContribution') }}</h4>
          <p>{{ $t('pools.contribution.refundContributionDescription')}}</p>
          <p>{{ $t('pools.contribution.refundAmount')}}: <span class="value">{{ currentContribution.amount }} {{ $t('general.aix') }}</span></p>
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
          <p>{{ $t('pools.contribution.payoutAmount')}}: <span class="value">{{ currentContribution.payout }} {{
              $t('general.aix') }}</span></p>
          <el-tooltip :disabled="investButtonEnabled" :content="$t('pools.userNotLoggedIn')">
            <span class="wrapper el-button">
              <el-button :disabled="!investButtonEnabled" @click="payout" class="aig-button" type="primary">
                {{ $t('pools.contribution.payout') }}
              </el-button>
            </span>
          </el-tooltip>
        </div>

        <ContributionDeleteSection v-if="isContributionDraft" />
      </div>
    </div>

    <PaymentConfirmationDialog
      :isVisible="isPaymentDialogVisible && !transactionError"
      :displayDialog="displayPaymentDialog"
      :content="$t('pools.pool.paymentInfo.metamaskAlert')" />

  </div>
</template>

<script>
import ConfirmContributionDialog from '@/components/pools/ConfirmContributionDialog'
import VueMarkdown from 'vue-markdown'
import PoolProductHeader from './PoolProductHeader'
import ContributionDeleteSection from '@/components/pools/ContributionDeleteSection'
import PaymentConfirmationDialog from '@/components/pools/PaymentConfirmationDialog'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('pools')

export default {
  components: {
    ConfirmContributionDialog,
    VueMarkdown,
    PoolProductHeader,
    ContributionDeleteSection,
    PaymentConfirmationDialog
  },
  data () {
    return {
      isDataLoaded: false,
      headerInfo: {},
      isPaymentDialogVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'currentContribution',
      'transactionError'
    ]),
    isContributionDraft () {
      return this.currentContribution.status.toUpperCase() === 'DRAFT'
    },
    isContributionAvailablePayout () {
      return this.currentContribution.status.toUpperCase() === 'AVAILABLEPAYOUT'
    },
    isContributionAvailableRefund () {
      return this.currentContribution.status.toUpperCase() === 'AVAILABLEREFUND'
    },
    investButtonEnabled () {
      return !!((this.$store.getters['user/isAuthenticated'] && this.$store.getters['user/isWeb3Enabled']))
    }
  },
  async mounted () {
    await this.$store.dispatch('pools/getContribution', this.$route.params.id)
    this.isDataLoaded = true

    this.headerInfo = {
      title: this.currentContribution.poolName
    }
  },
  methods: {
    displayPaymentDialog (value) {
      this.isPaymentDialogVisible = value
    },
    async pay () {
      this.isPaymentDialogVisible = true

      await this.$store.dispatch('pools/addContribution', {
        contributionId: this.currentContribution.id,
        amount: this.currentContribution.amount,
        poolId: this.currentContribution.poolId
      })
    },
    async payout () {
      this.isPaymentDialogVisible = true

      await this.$store.dispatch('pools/payoutContribution', {
        contributionId: this.currentContribution.id,
        poolId: this.currentContribution.poolId,
        poolContractAddress: this.currentContribution.poolContractAddress
      })
    },
    async refund () {
      this.isPaymentDialogVisible = true

      await this.$store.dispatch('pools/refundContribution', {
        contributionId: this.currentContribution.id,
        poolId: this.currentContribution.poolId,
        poolContractAddress: this.currentContribution.poolContractAddress
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~helpers/variables';
  @import '~helpers/mixins';

  .title-section {
    display: flex;
    flex-direction: column;
    width: 50%;
    padding: 53px 20px 53px 53px;

    .back-button {
      margin-right: 10px;
    }

    h2 {
      flex-grow: 0;
    }
  }

  .aig-button {
    margin-top: 0;
  }

  .el-row {

    &.info-section {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 50%;
      padding-top: 40px;
      color: white;
      background: $purple-gradient-top-down;
    }

    div {
      padding: 23px;
      font-family: $font-secondary;
      font-weight: 600;
      font-size: 20pt;
      width: 33%;
      font-weight: 600;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
    }
  }

  .investment-item-label {
    display: block;
    text-transform: uppercase;
    font-size: 11pt;
    font-weight: 300;
  }

  .aig-info-content-container {
    .value {
      font-weight: 400;
    }

    .wrapper {
      width: 100%;
      margin-top: 10px;
    }
  }
</style>
