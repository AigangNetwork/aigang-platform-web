<template>
  <el-dialog :title="$t('insurance.policy.paymentInfo.title')" :visible.sync="show">
    <transition-group name="slideDown">
      <div key="1" v-if="!txHash">
        <p class="bold">{{ $t('insurance.policy.paymentInfo.metamaskAlert') }}</p>
      </div>
      <div class="payment-dialog-info" v-if="txHash" key="2">
        <p>{{ $t('insurance.policy.paymentInfo.body') }}</p>
        <a class="address" :href="txLink" target="_blank">
          <span class="contract-address">{{ this.txHash }}</span>
        </a>
        <div class="buttons">
          <router-link :to="policyListRoute">
            <el-button class="button" type="primary">{{ $t('insurance.policy.paymentInfo.buttons.goBack')}}</el-button>
          </router-link>
        </div>
      </div>
    </transition-group>
  </el-dialog>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('insurance')

export default {
  props: ['isVisible', 'displayDialog'],
  data () {
    return {
      policyListRoute: '/insurance/policy/mypolicies'
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
    ...mapGetters(['txHash']),
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
  .payment-dialog-info {
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
