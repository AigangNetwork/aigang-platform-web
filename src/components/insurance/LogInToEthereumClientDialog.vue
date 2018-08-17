<template>
  <el-dialog :title="$t('insurance.policy.notLoggedToEthereumClientDialog.title')" :visible.sync="show">
    <div class="policy-dialog-info">
      <p>{{ $t('insurance.policy.notLoggedToEthereumClientDialog.content') }}</p>
      <div class="buttons">
        <el-button class="button" type="primary" @click="reload">{{ $t('insurance.policy.notLoggedToEthereumClientDialog.buttons.reload') }}</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: ['isVisible', 'displayDialog'],
  computed: {
    show: {
      get () {
        return this.isVisible
      },
      set (value) {
        this.displayDialog(value)
      }
    }
  },
  methods: {
    reload () {
      window.location.reload()
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
      .button {
        width: 100%;
      }
    }
  }
</style>
