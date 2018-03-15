<template>
  <el-dialog class="notification-dialog" :title="title" :visible.sync="notificationVisible" width="40%" center>
    <div>
      <ul>
        <li class="notification-li" v-for="item in messages" v-text="item" :key="item"></li>
      </ul>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button class="aig-button" type="primary" @click="notificationVisible = false">{{ $t('general.ok') }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import eventHub from '../utils/eventHub'
import router from '@/router'

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
    handle401 () {
      this.$store.dispatch('logOut')
      this.messages.push(this.$t('errors.401'))
      router.push('/login')
    },
    notifyMessage (error) {
      this.notificationVisible = true
      this.title = this.$t('errors.error')

      if (error.response) {
        if (error.response.status === 400) {
          this.handle400(error.response.data)
          return
        }

        if (error.response.status === 401) {
          this.handle401()
          return
        }

        this.messages.push(this.$t('errors.' + error.response.status.toString()))
      } else {
        this.messages.push(this.$t('errors.unhandled') + error.message)
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
<style>
  .notification-dialog li {
    list-style: none;
    font-size: 16px;
    color: black;
  }

  .notification-dialog .dialog-footer {
    display: block;
    width: 100%;
    text-align: center;
  }

  .notification-dialog .el-dialog__body {
    padding-left: 15px;
  }

  .notification-dialog .aig-button {
    width: 140px;
  }

  .notification-dialog .el-dialog {
    padding: 30px;
  }

  .notification-dialog .el-dialog__title {
    font-family: "Raleway", sans-serif;
    font-size: 24px;
    font-weight: normal;
    line-height: 1.33;
    letter-spacing: 0.5px;
    color: #423176;
    text-shadow: 0 2px 4px rgba(219, 224, 231, 0.5);
  }

  .notification-dialog .el-dialog__header {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .notification-dialog .el-dialog__header {
    text-align: center;
  }
</style>
