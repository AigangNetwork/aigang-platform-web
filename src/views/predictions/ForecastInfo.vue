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
          <p>{{ $t('predictions.forecast.yourForecast') }}: <span class="value">{{ userForecast.outcomeTitle }}</span></p>
          <p>{{ $t('predictions.forecast.yourForecastIndex') }}: <span class="value">{{ userForecast.outcomeIndex }}</span></p>
          <p>{{ $t('predictions.forecast.yourAmount') }}: <span class="value">{{ getForecastAmount }} {{ $t('general.aix') }} <span class="details">({{ $t('predictions.fee')}}: {{ userForecast.fee }} {{ $t('general.aix') }})</span></span></p>
          <p v-if="this.userForecast.predictionStatus === 'resolved'">{{ $t('predictions.wonOutcome') }}: <span class="value">{{ userForecast.resultOutcomeName }} <span class="details">({{ $t('predictions.index') }}: {{ userForecast.resultOutcomeIndex }})</span></span></p>
        </div>

        <div v-if="isPercentageVisible">
          <h4 class="info-title">{{ $t('predictions.predictionStatistics') }}</h4>
          <OutcomesPercentage v-loading="statisticsLoading" :statistics="predictionStatistics" :resultOutcomeId="userForecast.resultOutcomeId" />
        </div>

        <el-tooltip v-if="isForecastsWon" :disabled="!!$store.getters['user/web3']" :content="$t('predictions.forecast.logInToWeb3')">
          <span class="wrapper el-button">
            <el-button :disabled="!$store.getters['user/web3']" class="aig-button" type="primary" @click="payout">
              {{ $t('predictions.forecast.payout') }}
            </el-button>
          </span>
        </el-tooltip>

        <ForecastDeleteSection v-if="isforecastDraft" />

        <PaymentConfirmationDialog :isVisible="isPaymentDialogVisible && !transactionError" :displayDialog="displayPaymentDialog" :content="$t('predictions.forecast.metamaskAlert')" />
      </div>
    </div>
  </div>
</template>

<script>
import PredictionInfoHeader from './PredictionInfoHeader'
import ForecastStatus from '@/components/predictions/ForecastStatus'
import OutcomesPercentage from '@/components/predictions/OutcomesPercentage'
import ForecastDeleteSection from '@/components/predictions/ForecastDeleteSection'
import Card from '@/components/Card'
import VueMarkdown from 'vue-markdown'
import PaymentConfirmationDialog from '@/components/predictions/PaymentConfirmationDialog'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('predictions')

export default {
  components: {
    PredictionInfoHeader,
    OutcomesPercentage,
    ForecastStatus,
    Card,
    PaymentConfirmationDialog,
    ForecastDeleteSection,
    VueMarkdown
  },
  data () {
    return {
      isDataLoaded: false,
      isPaymentDialogVisible: false,
      headerInfo: {}
    }
  },
  methods: {
    payout () {
      this.$store.dispatch('predictions/payout', {
        id: this.userForecast.id,
        predictionId: this.userForecast.predictionId,
        marketAddress: this.userForecast.marketAddress
      })
      this.displayPaymentDialog(true)
    },
    displayPaymentDialog (value) {
      this.isPaymentDialogVisible = value
    }
  },
  computed: {
    ...mapGetters(['userForecast', 'predictionStatistics', 'statisticsLoading', 'transactionError']),
    isPercentageVisible () {
      const status = this.userForecast.status.toUpperCase()
      const predictionStatus = this.userForecast.predictionStatus.toUpperCase()
      return (status !== 'DRAFT' && status !== 'NOTSET' && status !== 'PENDINGPAYMENT') || predictionStatus === 'RESOLVED'
    },
    isForecastsWon () {
      return this.userForecast.status.toUpperCase() === 'WON'
    },
    contractLink () {
      return process.env.ETHERSCAN_ADDRESS + process.env.ADDRESS_PATX + this.userForecast.marketAddress
    },
    isforecastDraft () {
      if (this.userForecast.status) {
        const status = this.userForecast.status.toUpperCase()
        return status === 'DRAFT'
      }
    },
    getForecastAmount () {
      return Math.round((this.userForecast.amount - this.userForecast.fee) * 10000000) / 10000000
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
        margin-bottom: 20px;

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
