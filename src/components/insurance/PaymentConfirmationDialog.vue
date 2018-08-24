<template>
  <el-dialog :title="$t('insurance.policy.paymentInfo.title')" :visible.sync="show">
    <div class="policy-dialog-info">
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
  </el-dialog>
</template>
<script>
import {
  mapGetters
} from 'vuex'

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
