<template>
  <el-dialog :title="title" :visible.sync="show">
    <transition-group name="slideDown">
      <div key="1" v-if="!txHash">
        <p class="bold">{{ content }}</p>
        <div class="loader-box" v-loading="!txHash" :element-loading-text="$t('general.processingTransaction')"></div>
      </div>

      <div class="payment-dialog-info" v-if="txHash" key="3">
        <p>{{ bodyText }}</p>
        <a class="address" :href="txLink" target="_blank">
          <span class="contract-address">{{ txHash }}</span>
        </a>
        <div class="buttons">
          <router-link :to="route">
            <el-button class="button" type="primary">{{ btnText }}</el-button>
          </router-link>
        </div>
      </div>
    </transition-group>
  </el-dialog>
</template>
<script>
export default {
  props: ['isVisible', 'displayDialog', 'content', 'txHash', 'title', 'route', 'btnText', 'bodyText'],
  watch: {
    transactionHash () {
      if (this.txHash) {
        this.show = true
      }
    }
  },
  computed: {
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
    },
    loading () {
      return !this.txHash && this.txStarted
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

  .loader-box {
    margin: 40px 0;
    min-height: 30px;
    display: block;
  }
</style>
