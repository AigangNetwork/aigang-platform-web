<template>
  <div class="aig-container aig-view aig-info" v-loading="$store.getters.loading">
    <div class="aig-info-header" v-if="isDataLoaded">
      <div class="back-button-container">
        <router-link :to="{ name: 'PoolsProductsList' }" class="back-button">{{ $t('general.backToList')}}</router-link>
      </div>
      <div class="aig-info-header-content">
        <PoolProductHeader :info="headerInfo" />
      </div>
    </div>

    <div class="aig-info-content-container" v-if="isDataLoaded">
      <div class="aig-info-content">
        <h4 class="info-title">{{ $t('pools.pool.description') }}</h4>
        <vue-markdown class="markup-content" :html="false" :source="currentPool.description || $t('pools.pool.noDescription')"></vue-markdown>

        <h4 class="info-title">{{ $t('pools.pool.contractAddress') }}</h4>
        <p><a class="contract-address" target="_blank" :href="contractLink">{{ currentPool.poolContractAddress }}</a></p>

        <div v-if="status === 'active'">
          <h4 class="info-title">{{ $t('pools.pool.termsAndConditions') }}</h4>
          <ScrollableMarkupText class="scrollable-text" :text="currentPool.termsAndConditions" @scrolledToBottom="onScrolledToBottom" />

          <el-tooltip :disabled="!investButtonDisabled" :content="$t('pools.pool.agreeWithTermsAndConditions')">
            <span class="wrapper el-button">
              <el-button :disabled="investButtonDisabled" @click="contribute" class="aig-button" type="primary">
                {{ $t('pools.pool.invest') }}
              </el-button>
            </span>
          </el-tooltip>
        </div>

        <ConfirmContributionDialog
          :isVisible="isConfirmContributionDialogVisible"
          :displayDialog="displayConfirmContributionDialog"
          :maxAllowedAmount="maxAllowedAmount"
          @addContribution="onAddContribution"/>

        <PaymentConfirmationDialog
          :isVisible="isPaymentDialogVisible && !transactionError"
          :displayDialog="displayPaymentDialog"
          :content="$t('pools.pool.paymentInfo.metamaskAlert')" />
      </div>
    </div>
  </div>
</template>

<script>
import ConfirmContributionDialog from '@/components/pools/ConfirmContributionDialog'
import VueMarkdown from 'vue-markdown'
import PoolProductHeader from './PoolProductHeader'
import ScrollableMarkupText from '@/components/insurance/ScrollableMarkupText'
import PaymentConfirmationDialog from '@/components/pools/PaymentConfirmationDialog'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('pools')

export default {
  components: {
    ConfirmContributionDialog,
    VueMarkdown,
    PoolProductHeader,
    ScrollableMarkupText,
    PaymentConfirmationDialog
  },
  data () {
    return {
      isDataLoaded: false,
      isConfirmContributionDialogVisible: false,
      headerInfo: {},
      investButtonDisabled: true,
      isPaymentDialogVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'currentPool',
      'transactionError'
    ]),
    maxAllowedAmount () {
      const numbersAfterPointer = 6
      return Math.round((this.currentPool.goalPoolSize - this.currentPool.currentPoolSize) * Math.pow(10, numbersAfterPointer)) / Math.pow(10, numbersAfterPointer)
    },
    contractLink () {
      return process.env.ETHERSCAN_ADDRESS + process.env.ADDRESS_PATX + this.currentPool.poolContractAddress
    }
  },
  async mounted () {
    await this.$store.dispatch('pools/getPool', this.$route.params.id)
    this.isDataLoaded = true

    this.headerInfo = {
      status: this.currentPool.status,
      title: this.currentPool.title,
      contributions: this.currentPool.contributions,
      currentPoolSize: this.currentPool.currentPoolSize,
      poolGoalSize: this.currentPool.goalPoolSize,
      startDateUtc: this.currentPool.startDateUtc,
      endDateUtc: this.currentPool.endDateUtc
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

      await this.$store.dispatch('pools/addContribution', {
        amount,
        poolId: this.$route.params.id,
        poolContractAddress: this.currentPool.poolContractAddress
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
    .scrollable-text {
      height: 200px;
    }

    .wrapper {
      width: 100%;
      margin-top: 10px;
    }
  }

    .aig-info {
    .aig-info-content {
      p.description {
        margin-bottom: 40px;
      }

      .info-title {
        margin-top: 0px;
      }
    }

    .details {
      margin-bottom: 20px;

      p {
        margin: 0px;
      }

      .value {
        font-weight: 400;
      }
    }

    .markup-content {
      margin-bottom: 20px;
    }
  }

  .no-margin-bottom {
    margin-bottom: 0;
  }

  .no-margin-top {
    margin-top: 0;
  }

</style>
