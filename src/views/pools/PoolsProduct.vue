<template>
  <div class="aig-container aig-view" v-loading="$store.getters.loading">
    <Card class="investment-product-card" v-loading="$store.getters.loading">
      <div slot="body" v-show="isDataLoaded" class="investment-product-container">
        <div class="flex-container">
          <el-row class="title-section">
            <router-link :to="{name: 'PoolsProducts'}" class="back-button">
              <i class="back-icon el-icon-arrow-left"></i>
            </router-link>
            <h2>{{ currentPool.title }} </h2>
            {{ currentPool.description}}
          </el-row>
          <el-row class="info-section">
            <div>
              <span class="investment-item-label">{{ $t('pools.portfolioInfo.totalPolicies') }}</span>
              {{ currentPool.policies }}
            </div>
            <div>
              <span class="investment-item-label">{{ $t('pools.portfolioInfo.investedAmount') }}</span>
              {{ currentPool.currentPoolSize }}
            </div>
            <div>
              <span class="investment-item-label">{{ $t('pools.portfolioInfo.insuranceType') }}</span>
              {{ currentPool.type }}
            </div>
            <div>
              <span class="investment-item-label">{{ $t('pools.portfolioInfo.investors') }}</span>
              {{ currentPool.investors }}
            </div>
            <div>
              <span class="investment-item-label">{{ $t('pools.portfolioInfo.amountPaidForInsurance') }}</span>
              {{ currentPool.paid }}
            </div>
            <div>
              <span class="investment-item-label">{{ $t('pools.portfolioInfo.predictedProfit') }}</span>
              {{ currentPool.predictedProfit }}
            </div>
          </el-row>
        </div>
        <el-row>
          <el-button class="aig-button" type="primary" @click.prevent.native="contribute">{{ $t('pools.invest') }}</el-button>
        </el-row>
      </div>
    </Card>

    <ConfirmContributionDialog
      :isVisible="isConfirmContributionDialogVisible"
      :displayDialog="displayConfirmContributionDialog"
      :maxAllowedAmount="maxAllowedAmount"
      @addContribution="onAddContribution"/>

  </div>
</template>
<script>
import Card from '@/components/Card'
import ConfirmContributionDialog from '@/components/pools/ConfirmContributionDialog'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('pools')

export default {
  components: {
    Card,
    ConfirmContributionDialog
  },
  data () {
    return {
      isDataLoaded: false,
      isConfirmContributionDialogVisible: false
    }
  },
  computed: {
    ...mapGetters(['currentPool']),
    maxAllowedAmount () {
      const numbersAfterPointer = 6
      return Math.round((this.currentPool.goalPoolSize - this.currentPool.currentPoolSize) * Math.pow(10, numbersAfterPointer)) / Math.pow(10, numbersAfterPointer)
    }
  },
  async mounted () {
    await this.$store.dispatch('pools/getPool', this.$route.params.id)
    this.isDataLoaded = true
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

      await this.$store.dispatch('pools/contribute', {
        amount,
        poolId: this.$route.params.id
      })

      this.$router.push({ name: 'Portfolio' })
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
</style>
