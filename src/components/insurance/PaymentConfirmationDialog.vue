<template>
  <el-dialog :title="$t('insurance.policy.paymentInfoTitle')" :visible.sync="show">
    <p class="policy-dialog-info">
      <label>{{ $t('insurance.policy.txHash') }}:</label>
      <span class="contract-address">{{ this.txHash }}</span>
    </p>
    <p class="policy-dialog-info">
      {{ $t('insurance.policy.paymentInfoBody') }}
      <strong>
        <a :href="txLink" target="_blank">{{ $t('general.here') }}</a>
      </strong>
    </p>
  </el-dialog>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  props: ['isVisible', 'displayDialog'],
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
      return process.env.ETHERSCAN_ADDRESS + this.txHash
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
  }
</style>
