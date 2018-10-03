<template>
  <el-dialog :title="$t('predictions.prediction.paymentInfo.title')" :visible.sync="show">
    <transition-group name="slideDown">
      <div key="1" v-if="!transactionHash">
        <p class="bold">{{ $t('predictions.prediction.paymentInfo.metamaskAlert') }}</p>
      </div>
      <div class="policy-dialog-info" v-if="transactionHash" key="2">
        <p>{{ $t('predictions.prediction.paymentInfo.body') }}</p>
        <a class="address" :href="txLink" target="_blank">
          <span class="contract-address">{{ transactionHash }}</span>
        </a>
        <div class="buttons">
          <router-link :to="userForecastListRoute">
            <el-button class="button" type="primary">{{ $t('predictions.prediction.paymentInfo.buttons.goBack')}}</el-button>
          </router-link>
        </div>
      </div>
    </transition-group>
  </el-dialog>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('predictions')

export default {
  props: ['isVisible', 'displayDialog'],
  data () {
    return {
      userForecastListRoute: '/predictions/myforecasts'
    }
  },
  watch: {
    txHash () {
      if (this.txHash) {
        this.show = true
      }
    }
  },
  computed: {
    ...mapGetters(['transactionHash']),
    txLink () {
      return process.env.ETHERSCAN_ADDRESS + process.env.TX_PATH + this.txHash
    },
    show: {
      get () {
        return this.isVisible
      },
      set (value) {
        this.displayDialog(value)
      }
    }
  }
}

</script>
<style lang="scss" scoped>
  .policy-dialog-info {
    max-width: 100%;
    word-wrap: break-word;

    .address {
      margin-top: 10px;
    }

    .buttons {
      margin-top: 30px;
      text-align: center;
      .button {
        min-width: 200px;
      }
    }
  }
</style>
