<template>
  <div class="aig-container aig-view aig-info" v-loading="$store.getters.loading">
    <div class="aig-info-header" v-if="isDataLoaded">
      <div class="back-button-container">
        <router-link :to="{ name: 'MyForecastsList' }" class="back-button">{{ $t('general.backToList')}}</router-link>
      </div>
      <div class="aig-info-header-content">
        <PredictionInfoHeader :info="headerInfo" />
      </div>
    </div>

    <div class="aig-info-content-container" v-if="isDataLoaded">
      <div class="aig-info-content">
        <h4 class="info-title">{{ $t('predictions.description') }}</h4>
        <vue-markdown class="markup-content" :html="false" :source="userForecast.predictionDescription || $t('predictions.noDescription')"></vue-markdown>
        <h4 class="info-title">{{ $t('predictions.marketContractAddress') }}</h4>
        <p><a class="contract-address" target="_blank" :href="contractLink">{{ userForecast.marketAddress }}</a></p>
        <h4 class="info-title">{{ $t('predictions.forecastDetails') }}</h4>
        <div class="details">
          <p>{{ $t('predictions.forecast.status') }}: <span class="value"><ForecastStatus :status="userForecast.status"/></span></p>
          <p>{{ $t('predictions.forecast.yourForecast') }}: <span class="value">{{ userForecast.outcomeTitle }} <span class="details">({{ $t('predictions.index') }}: {{ userForecast.outcomeIndex }})</span></span></p>
          <p>{{ $t('predictions.forecast.yourAmount') }}: <span class="value">{{ userForecast.amount }} {{ $t('general.aix') }} <span class="details">({{ $t('predictions.forecast.forecastAmount') }}: {{ getForecastAmount }} {{ $t('general.aix') }}, {{ $t('predictions.fee')}}: {{ userForecast.fee }} {{ $t('general.aix') }})</span></span></p>
          <p v-if="isPredictionResolved">{{ $t('predictions.wonOutcome') }}: <span class="value">{{ userForecast.resultOutcomeName }} <span class="details">({{ $t('predictions.index') }}: {{ userForecast.resultOutcomeIndex }})</span></span></p>
          <p v-if="isPredictionResolved">{{ $t('predictions.wonAmount') }}: <span class="value">{{ userForecast.wonAmount }} {{ $t('general.aix') }}</span></p>
        </div>

        <div v-if="isPercentageVisible">
          <h4 class="info-title">{{ $t('predictions.predictionStatistics') }}</h4>
          <CountPerOutcome v-loading="countPerOutcomeStatisticsLoading" :statistics="countPerOutcomeStatistics" :resultOutcomeId="userForecast.resultOutcomeId" />
          <AmountPerOutcome v-loading="amountPerOutcomeStatisticsLoading" :statistics="amountPerOutcomeStatistics" :resultOutcomeId="userForecast.resultOutcomeId"/>
        </div>

        <el-tooltip v-if="isForecastsWon" :disabled="$store.getters['user/isWeb3Enabled']" :content="$t('predictions.forecast.logInToWeb3')">
          <span class="wrapper el-button">
            <el-button :disabled="!$store.getters['user/isWeb3Enabled']" class="aig-button" type="primary" @click="payoutWon">
              {{ $t('predictions.forecast.payout') }}
            </el-button>
          </span>
        </el-tooltip>

        <el-tooltip v-if="isAvailableRefund" :disabled="$store.getters['user/isWeb3Enabled']" :content="$t('predictions.forecast.logInToWeb3')">
          <span class="wrapper el-button">
            <el-button :disabled="!$store.getters['user/isWeb3Enabled']" class="aig-button" type="primary" @click="payoutRefund">
              {{ $t('predictions.forecast.getRefund') }}
            </el-button>
          </span>
        </el-tooltip>

        <PaymentConfirmationDialog
          :isVisible="isPaymentDialogVisible && !transactionError"
          :displayDialog="displayPaymentDialog"
          :content="$t('predictions.forecast.metamaskAlert')"
          :txHash="transactionHash"
          :title="$t('predictions.prediction.paymentInfo.title')"
          :bodyText="$t('predictions.prediction.paymentInfo.body')"
          :route="userForecastListRoute"
          :btnText="$t('predictions.prediction.paymentInfo.buttons.goBack')"/>
      </div>
    </div>
  </div>
</template>

<script>
import PredictionInfoHeader from './PredictionInfoHeader'
import ForecastStatus from '@/components/predictions/ForecastStatus'
import CountPerOutcome from '@/components/predictions/CountPerOutcome'
import AmountPerOutcome from '@/components/predictions/AmountPerOutcome'
import Card from '@/components/Card'
import VueMarkdown from 'vue-markdown'
import PaymentConfirmationDialog from '@/components/common/PaymentConfirmationDialog'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('predictions')

export default {
  components: {
    PredictionInfoHeader,
    CountPerOutcome,
    AmountPerOutcome,
    ForecastStatus,
    Card,
    PaymentConfirmationDialog,
    VueMarkdown
  },
  data () {
    return {
      isDataLoaded: false,
      isPaymentDialogVisible: false,
      headerInfo: {},
      userForecastListRoute: '/predictions/myforecasts'
    }
  },
  methods: {
    async payoutWon () {
      const payload = {
        id: this.userForecast.id,
        predictionId: this.userForecast.predictionId,
        marketAddress: this.userForecast.marketAddress
      }

      await this.$store.dispatch('predictions/payoutWon', payload)

      this.displayPaymentDialog(true)
    },
    async payoutRefund () {
      const payload = {
        id: this.userForecast.id,
        predictionId: this.userForecast.predictionId,
        marketAddress: this.userForecast.marketAddress
      }

      await this.$store.dispatch('predictions/payoutRefund', payload)

      this.displayPaymentDialog(true)
    },
    displayPaymentDialog (value) {
      this.isPaymentDialogVisible = value
    }
  },
  computed: {
    ...mapGetters([
      'userForecast',
      'countPerOutcomeStatisticsLoading',
      'amountPerOutcomeStatisticsLoading',
      'countPerOutcomeStatistics',
      'amountPerOutcomeStatistics',
      'transactionError',
      'transactionHash'
    ]),
    isPercentageVisible () {
      const status = this.userForecast.status.toUpperCase()
      const predictionStatus = this.userForecast.predictionStatus.toUpperCase()

      return (
        (status !== 'NOTSET' && status !== 'PENDINGPAYMENT' && status !== 'AVAILABLEREFUND' && predictionStatus !== 'CANCELED') ||
        predictionStatus === 'RESOLVED'
      )
    },
    contractLink () {
      return process.env.ETHERSCAN_ADDRESS + process.env.ADDRESS_PATH + this.userForecast.marketAddress
    },
    isPredictionResolved () {
      return this.userForecast.predictionStatus.toUpperCase() === 'RESOLVED'
    },
    isForecastsWon () {
      return this.userForecast.status.toUpperCase() === 'WON'
    },
    isAvailableRefund () {
      return this.userForecast.status.toUpperCase() === 'AVAILABLEREFUND'
    },
    getForecastAmount () {
      const numbersAfterPointer = 6
      return Math.round((this.userForecast.amount - this.userForecast.fee) * Math.pow(10, numbersAfterPointer)) / Math.pow(10, numbersAfterPointer)
    },
    payButtonVisible () {
      return this.userForecast.predictionStatus === 'published'
    }
  },
  async mounted () {
    await this.$store.dispatch('predictions/getUserForecast', this.$route.params.id)
    this.isDataLoaded = true
    this.headerInfo = {
      title: this.userForecast.predictionTitle,
      status: this.userForecast.predictionStatus,
      forecastStartUtc: this.userForecast.forecastStartUtc,
      forecastEndUtc: this.userForecast.forecastEndUtc,
      resultDateUtc: this.userForecast.resultDateUtc,
      forecastsCount: this.userForecast.forecastsCount,
      poolSize: this.userForecast.poolSize
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

      .details {
        margin-bottom: 40px;

        p {
          margin: 0px;
        }

        .value {
          font-weight: 400;

          .details {
            font-weight: 200;
            color: $dark-gray;
          }
        }
      }

      .markup-content {
        margin-bottom: 20px;
      }
    }
  }

  .wrapper {
    margin-top: 48px;
    width: 100%;
  }
</style>
