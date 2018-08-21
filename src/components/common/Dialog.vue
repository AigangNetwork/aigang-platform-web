<template>
  <el-dialog class="notification-dialog" :title="title" :visible.sync="show" :show-close="false" center>
    <div class="confimation-dialog">
      <span>{{ body }}</span>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onCancel">{{ $t('profile.general.cancel') }}</el-button>
      <el-button type="primary" @click="onConfirm">{{ $t('profile.general.confirm') }}</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  props: ['title', 'body', 'onConfirm', 'isVisible', 'onCancel', 'displayDialog'],
  computed: {
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
