<template>
  <Card class="investment-product-card">
    <div slot="body" v-loading="loading" class="investment-product-container">
      <div class="flex-container">
        <el-row class="title-section">
          <router-link :to="{name: 'PoolsProducts'}" class="back-button">
            <i class="back-icon el-icon-arrow-left"></i>
          </router-link>

          <h2>{{ product.title }} </h2>
          {{ product.description}}
        </el-row>
        <el-row class="info-section">
          <div>
            <span class="investment-item-label">{{ $t('pools.portfolioInfo.totalPolicies') }}</span>
            {{ product.policies }}
          </div>
          <div>
            <span class="investment-item-label">{{ $t('pools.portfolioInfo.investedAmount') }}</span>
            {{ product.currentPoolSize }}
          </div>
          <div>
            <span class="investment-item-label">{{ $t('pools.portfolioInfo.insuranceType') }}</span>
            {{ product.type }}
          </div>
          <div>
            <span class="investment-item-label">{{ $t('pools.portfolioInfo.investors') }}</span>
            {{ product.investors }}
          </div>
          <div>
            <span class="investment-item-label">{{ $t('pools.portfolioInfo.amountPaidForInsurance') }}</span>
            {{ product.paid }}
          </div>
          <div>
            <span class="investment-item-label">{{ $t('pools.portfolioInfo.predictedProfit') }}</span>
            {{ product.predictedProfit }}
          </div>

        </el-row>
      </div>
      <el-row>
        <el-button class="aig-button" type="primary" @click.prevent.native="insure">{{ $t('pools.invest') }}</el-button>
      </el-row>
    </div>
  </Card>
</template>
<script>
import Card from '@/components/Card'
export default {
  components: { Card },
  data () {
    return {
      loading: false,
      product: {
        title: 'Android Device Insurance',
        description: '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"',
        type: 'Android Device',
        investedCount: Math.floor(Math.random() * 100),
        poolSize: Math.floor(Math.random() * 14200),
        currentPoolSize: Math.floor(Math.random() * 1420),
        predictedProfit: Math.floor(Math.random() * 100),
        status: 'Active',
        paid: 132,
        policies: Math.floor(Math.random() * 100),
        investors: Math.floor((Math.random() * 1000))
      }
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

  .investment-product-container {

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
  }

  .investment-item-label {
    display: block;
    text-transform: uppercase;
    font-size: 11pt;
    font-weight: 300;
  }
</style>
