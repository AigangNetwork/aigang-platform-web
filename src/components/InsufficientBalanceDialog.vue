<template>
  <el-dialog class="notification-dialog" :title="$t('general.insufficientBalanceDialog.title')" :show-close="false" :visible="showDialog" center>
    <div class="confimation-dialog">
      <div v-if="!isProduction" class="center">
        <p>{{ $t('general.insufficientBalanceDialog.qaBody') }}</p>
        <a :href="$t('general.insufficientBalanceDialog.qaFaucetLink')" target="_blank">{{ $t('general.insufficientBalanceDialog.qaFaucetLink') }}</a>
      </div>
      <div v-if="isProduction">
        {{ $t('general.insufficientBalanceDialog.productionBody') }}
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onButtonClick">{{ $t('general.insufficientBalanceDialog.button') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ['title', 'body', 'showDialog'],
  methods: {
    onButtonClick () {
      this.$emit('onButtonClick')
    }
  },
  computed: {
    isProduction () {
      return process.env.NODE_ENV === 'production'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~helpers/variables';

  .center {
    text-align: center;

    a {
      font-size: 12pt;
      color: $light-blue;
    }
  }
</style>
