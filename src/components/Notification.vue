<template>
  <el-dialog
    :title="title"
    :visible.sync="notificationVisible"
    width="40%"
    center>
    <div>
      <ul>
        <!-- <template v-for="item in data.messages">
          <li>{{ item }}</li>
        </template> -->
        <li v-for="item in messages" v-text="item" :key="item"></li>
      </ul>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="notificationVisible = false">{{ $t('general.ok') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import eventHub from '../utils/eventHub'

export default {
  name: 'Notification',
  data () {
    return {
      notificationVisible: false,
      title: '',
      messages: []
    }
  },

  methods: {
    handle400 (data) {
      if (data.params &&
        data.params.ValidationFailed) {
        var val
        for (val of data.params.ValidationFailed) {
          this.messages.push(this.$t('errors.validation.' + val.reason))
        }
      } else {
        this.messages.push(this.$t('errors.400'))
      }
    },
    notifyMessage (error) {
      this.notificationVisible = true
      this.title = this.$t('errors.error')

      if (error.status === 400) {
        this.handle400(error.data)
      } else {
        this.messages.push(this.$t('errors.' + error.status.toString()))
      }
    }
  },

  mounted (event) {
    eventHub.$on(eventHub.eventCommunicationError, event => {
      this.messages = []
      this.notifyMessage(event)
    })
  }
}
</script>
