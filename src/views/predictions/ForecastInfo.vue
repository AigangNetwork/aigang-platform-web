<template>
  <div class="aig-container aig-view" v-loading="$store.getters.loading">
    <Card class="forecast-card" v-show="isDataLoaded">
      <div slot="body">
        <div class="dataset-model-header-container">
          <el-row class="header">
            <router-link :to="{ name: 'MyForecastsList' }" class="back-button">
              <i class="back-icon el-icon-arrow-left"></i>
            </router-link>
            <h3>{{ userForecast.predictionTitle }}</h3>
          </el-row>
        </div>

        <div class="dataset-content-container">
          <div class="dataset-content">
            <p>{{ $t('predictions.forecasts.forecast')}}: {{ userForecast.outcomeTitle }}</p>
            <p>{{`${$t('predictions.forecasts.amount')} ${userForecast.amount}`}} {{ $t('general.aix') }}</p>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/Card'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('predictions')

export default {
  components: {
    Card
  },
  data () {
    return {
      isDataLoaded: false
    }
  },
  computed: {
    ...mapGetters(['userForecast'])
  },
  async mounted () {
    await this.$store.dispatch('predictions/getUserForecast', this.$route.params.id)
    this.isDataLoaded = true
  }
}
</script>

<style lang="scss" scoped>
  @import '~helpers/variables';

  .aig-container {
    .forecast-card {
      .header {
        display: flex;
        flex-direction: row;

        .back-icon {
          margin-top: 24px;
          margin-right: 10px;
        }
      }
    }
  }

</style>
