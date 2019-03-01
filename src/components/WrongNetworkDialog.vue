<template>
  <el-dialog :title="$t('errors.information')" :visible.sync="show" :close-on-click-modal="false" :close-on-press-escape="false">
    <template>
      <div class="dialog-info">
        <p>{{ $t('general.wrongNetwork') }} <span class="bold">{{ requiredNetwork.networkName }}</span></p>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import networkResolver from '@/utils/web3/networkResolver'

export default {
  props: ['isVisible', 'displayDialog'],
  data () {
    return {
      requiredNetwork: networkResolver(process.env.NODE_ENV)
    }
  },
  watch: {
    transactionHash () {
      if (this.txHash) {
        this.show = true
      }
    }
  },
  computed: {
    show: {
      get () {
        return this.isVisible
      },
      set (value) {
        this.displayDialog(value)
      }
    },
    loading () {
      return !this.txHash && this.txStarted
    }
  }
}
</script>
<style lang="scss" scoped>
  .dialog-info {
    max-width: 100%;
    word-wrap: break-word;
  }
</style>
