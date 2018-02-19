<template>
  <el-dialog
  :title="$t('data.upload.notifications.titles.error')"
  :visible.sync="notificationVisible"
  width="30%"
  center>
  <span>{{ message }}</span>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="notificationVisible = false">OK</el-button>
  </span>
</el-dialog>
</template>
<script>
import eventHub from '../utils/eventHub'
export default {
  data () {
    return {
      notificationVisible: false,
      message: ''
    }
  },
  methods: {
    notifyMessage (error) {
      this.notificationVisible = true
      this.message = this.$t('errors.' + error.status.toString())
    }
  },
  mounted (event) {
    eventHub.$on('errorNotification', event => {
      this.notifyMessage(event)
    })
  }
}
</script>
