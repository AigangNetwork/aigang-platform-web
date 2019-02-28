<template>
  <div class="aig-container aig-view aig-info" v-loading="$store.getters.loading || !isWeb3Loaded" v-if="isWeb3Enabled || !isWeb3Loaded">
    <div class="aig-info-header" v-if="isDataLoaded">
      <div class="back-button-container">
        <router-link :to="{ name: 'PredictionsList' }" class="back-button">{{ $t('general.backToList')}}</router-link>
      </div>
      <div class="aig-info-header-content">
        <PredictionInfoHeader :info="headerInfo" />
      </div>
    </div>
    <div class="aig-info-content-container" v-if="isDataLoaded">
      <div class="aig-info-content">
        <h4 class="info-title">{{ $t('predictions.description') }}</h4>
        <vue-markdown class="markup-content" :html="false" :source="prediction.description || $t('predictions.noDescription')"></vue-markdown>

        <h4 class="info-title">{{ $t('predictions.predictionDetails') }}</h4>
        <div class="details">
          <p class="no-margin-bottom">{{ $t('predictions.marketContractAddress') }}: <a class="contract-address" target="_blank" :href="contractLink">{{ prediction.marketAddress }}</a></p>
          <p>{{ $t('predictions.fee') }}: <span class="value">{{ prediction.fee }} {{ $t('general.aix') }}</span></p>
          <p v-if="this.prediction.status === 'resolved'">{{ $t('predictions.wonOutcome') }}: <span class="value">{{ prediction.resultOutcomeName }} ({{ $t('predictions.index') }}: {{ prediction.resultOutcomeIndex }})</span></p>
        </div>

        <div v-if="prediction.status !== 'resolved'">
          <h4 class="info-title">{{ $t('predictions.outcomes') }}</h4>

          <el-tooltip :disabled="!isPredictionTimeEnded" :content="$t('predictions.predictionHasEnded')">
          <Outcomes
            :selectedOutcomeIndex="selectedOutcomeIndex"
            :items="prediction.outcomes"
            :disabled="isOutcomesDisabled || isPredictionTimeEnded"
            @selected="onOutcomeSelected" />
            </el-tooltip>
        </div>

        <div v-if="isPercentageVisible">
          <h4 class="info-title">{{ $t('predictions.predictionStatistics') }}</h4>
          <CountPerOutcome v-loading="countPerOutcomeStatisticsLoading" :statistics="countPerOutcomeStatistics" :resultOutcomeId="prediction.resultOutcomeId"/>
          <AmountPerOutcome v-loading="amountPerOutcomeStatisticsLoading" :statistics="amountPerOutcomeStatistics" :resultOutcomeId="prediction.resultOutcomeId"/>
        </div>
      </div>
    </div>

    <ConfirmForecastDialog
      :prediction="prediction.title"
      :selectedOutcome="selectedOutcome"
      :isVisible="isPredictionConfirmDialogVisible"
      :displayDialog="displayPredictionConfirmDialog"
      :fee="prediction.fee"
      @createForecast="onCreateForecast"/>

      <PaymentConfirmationDialog
        :isVisible="isPaymentDialogVisible && !transactionError"
        :displayDialog="displayPaymentDialog"
        :txHash="transactionHash"
        :title="$t('predictions.prediction.paymentInfo.title')"
        :bodyText="$t('predictions.prediction.paymentInfo.body')"
        :route="userForecastListRoute"
        :btnText="$t('predictions.prediction.paymentInfo.buttons.goBack')" />

  </div>
  <div class="wallet-message" v-else>
      <h2>{{ $t('general.web3NotConnected') }}</h2>
  </div>
</template>

<script>
import PredictionInfoHeader from './PredictionInfoHeader'
import Card from '@/components/Card'
import Outcomes from '@/components/predictions/Outcomes'
import CountPerOutcome from '@/components/predictions/CountPerOutcome'
import AmountPerOutcome from '@/components/predictions/AmountPerOutcome'
import ConfirmForecastDialog from '@/components/predictions/ConfirmForecastDialog'
import PaymentConfirmationDialog from '@/components/common/PaymentConfirmationDialog'
import VueMarkdown from 'vue-markdown'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('predictions')

export default {
  components: {
    PredictionInfoHeader,
    Card,
    Outcomes,
    ConfirmForecastDialog,
    PaymentConfirmationDialog,
    CountPerOutcome,
    AmountPerOutcome,
    VueMarkdown
  },
  computed: {
    ...mapGetters([
      'prediction',
      'countPerOutcomeStatisticsLoading',
      'amountPerOutcomeStatisticsLoading',
      'countPerOutcomeStatistics',
      'amountPerOutcomeStatistics',
      'transactionError',
      'transactionHash'
    ]),
    contractLink () {
      return process.env.ETHERSCAN_ADDRESS + process.env.ADDRESS_PATH + this.prediction.marketAddress
    },
    isPercentageVisible () {
      return (
        this.prediction.status.toUpperCase() === 'RESOLVED'
      )
    },
    isOutcomesDisabled () {
      return (
        this.prediction.status === 'paused' ||
        this.prediction.status === 'canceled' ||
        this.prediction.status === 'pendingPublish' ||
        this.prediction.status === 'pendingResolve'
      )
    },
    isPredictionTimeEnded () {
      // 'Z' to specify UTC timezone
      const endTime = Date.parse(this.prediction.forecastEndUtc + 'Z')
      return endTime <= Date.now()
    },
    isWeb3Enabled () {
      return this.$store.getters['user/isWeb3Enabled']
    },
    isWeb3Loaded () {
      return this.$store.getters['user/isWeb3Loaded']
    }
  },
  data () {
    return {
      isDataLoaded: false,
      isPredictionConfirmDialogVisible: false,
      isPaymentDialogVisible: false,
      selectedOutcome: {},
      selectedOutcomeIndex: 0,
      headerInfo: {},
      userForecastListRoute: '/predictions/myforecasts'
    }
  },
  watch: {
    async isWeb3Enabled (newValue) {
      if (newValue) {
        await this.loadData()
      }
    }
  },
  async mounted () {
    if (this.isWeb3Enabled) {
      await this.loadData()
    }
  },
  methods: {
    async loadData () {
      await this.$store.dispatch('predictions/getPrediction', { id: this.$route.params.id, address: this.$route.params.address })
      this.isDataLoaded = true
      this.headerInfo = {
        title: this.prediction.title,
        status: this.prediction.status,
        forecastStartUtc: this.prediction.forecastStartUtc,
        forecastEndUtc: this.prediction.forecastEndUtc,
        forecastsCount: this.prediction.forecastsCount,
        poolSize: this.prediction.poolSize
      }
    },
    onOutcomeSelected (index) {
      this.prediction.outcomes.map(o => {
        if (o.index === index) {
          this.selectedOutcome = o
        }
      })

      this.selectedOutcomeIndex = index

      this.displayPredictionConfirmDialog(true)
    },
    displayPredictionConfirmDialog (value) {
      if (!value) {
        this.selectedOutcomeIndex = 0
      }

      this.isPredictionConfirmDialogVisible = value
    },
    displayPaymentDialog (value) {
      this.isPaymentDialogVisible = value
    },
    async onCreateForecast (data) {
      this.displayPredictionConfirmDialog(false)

      const payload = {
        predictionId: this.prediction.id,
        address: this.prediction.marketAddress,
        outcomeId: data.selectedOutcomeId,
        outcome: data.selectedOutcomeIndex,
        amount: data.amount
      }

      await this.$store.dispatch('predictions/addForecast', payload)

      this.displayPaymentDialog(true)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~helpers/variables';

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

  .wallet-message {
    text-align: center;
    width: 100%;
  }
</style>
