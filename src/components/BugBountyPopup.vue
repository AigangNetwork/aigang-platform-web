<template>
  <el-dialog class="notification-dialog" :visible="showDialog" :show-close="true" center @close="closeDialog">
    <div class="content">
      <h1>{{ $t('general.bugBountyDialog.header') }}</h1>
      <span>{{ $t('general.bugBountyDialog.text') }}</span>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onGetStartedClick">{{ $t('general.bugBountyDialog.button') }}</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: ['showDialog'],
  methods: {
    onGetStartedClick () {
      this.closeDialog()
      window.open('https://aigangnetwork.github.io/bugbounty', '_blank')
    },
    closeDialog () {
      this.$emit('onButtonClick')
    }
  }
}
</script>

<style lang="scss">
  @import '~helpers/variables';
  @import '~helpers/mixins';

  .notification-dialog {
    .content {
      text-align: center;
      font-size: 14pt;
    }
  }

</style>
