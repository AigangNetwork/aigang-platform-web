<template>
  <div class="aig-container aig-view aig-info" v-loading="$store.getters.loading">
    <div class="aig-info-header" v-if="isDataLoaded">
      <div class="back-button-container">
        <router-link :to="{ name: 'MyForecastsList' }" class="back-button">{{ $t('general.backToList')}}</router-link>
      </div>
      <div class="aig-info-header-content">
        <ForecastInfoHeader :forecast="userForecast" />
      </div>
    </div>
    <div class="aig-info-content-container" v-if="isDataLoaded">
      <div class="aig-info-content">
        <h4 class="info-title">{{ $t('predictions.prediction.description') }}</h4>
        <p>{{ userForecast.description || $t('predictions.prediction.noDescription') }}</p>
        <h4 class="info-title">{{ $t('predictions.prediction.marketContractAddress') }}</h4>
        <p><a class="contract-address" target="_blank" :href="contractLink">{{ userForecast.marketAddress }}</a></p>
        <h4 class="info-title">{{ $t('predictions.prediction.forecastDetails') }}</h4>
        <div class="details">
          <div>Your forecast: {{ userForecast.outcomeTitle }}</div>
          <div>Your amount: {{ userForecast.amount }} {{ $t('general.aix') }}</div>
        </div>
        <OutcomesPercentage :statistics="predictionStatistics" :selectedOutcomeId="userForecast.outcomeId"/>
      </div>
    </div>
  </div>
</template>

<script>
import ForecastInfoHeader from './ForecastInfoHeader'
import OutcomesPercentage from '@/components/predictions/OutcomesPercentage'
import Card from '@/components/Card'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('predictions')

export default {
  components: {
    ForecastInfoHeader,
    OutcomesPercentage,
    Card
  },
  data () {
    return {
      isDataLoaded: false
    }
  },
  computed: {
    ...mapGetters(['userForecast', 'predictionStatistics']),
    contractLink () {
      return process.env.ETHERSCAN_ADDRESS + process.env.ADDRESS_PATX + this.userForecast.marketAddress
    }
  },
  async mounted () {
    await this.$store.dispatch('predictions/getUserForecast', this.$route.params.id)
    this.isDataLoaded = true
  }
}
</script>

<style lang="scss" scoped>
  @import '~helpers/variables';

  .aig-info {
    .aig-info-content{
      p.description {
        margin-bottom: 40px;
      }

      .info-title {
        margin-top: 0px;
      }

      .details {
        margin-bottom: 40px;
        div {
          margin-bottom: 10px;
        }
      }
    }
  }

</style>
