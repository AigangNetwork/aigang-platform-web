<template>
  <el-dialog class="notification-dialog" :title="title" :visible.sync="notificationVisible" center>
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
      this.notificationVisible = false
      this.$store.dispatch('logOut')
      router.push('/login')
    },
    handle403 () {
      this.notificationVisible = false
      this.$router.push({
        name: 'AccessDenied'
      })
    },
    handle404 () {
      this.notificationVisible = false
      this.$router.push({
        name: 'NotFound',
        params: { '0': 'notfound' }
      })
    },
    notifyRequestError (error) {
      this.notificationVisible = true
      this.title = this.$t('errors.error')

      if (!error.response) {
        this.messages.push(this.$t('errors.serverNotFound'))
        this.messages.push(this.$t('errors.serverNotFoundRule1'))
        this.messages.push(this.$t('errors.serverNotFoundRule2'))
        this.messages.push(this.$t('errors.contactIfError'))
        return
      }

      if (error.response) {
        switch (error.response.status) {
          case 400:
            this.handle400(error.response.data)
            break
          case 401:
            this.handle401()
            break
          case 403:
            this.handle403()
            break
          case 404:
            this.handle404()
            break
          case 408:
            this.messages.push(this.$t('errors.validation.GatewayTimeout'))
            break
          case 500:
            this.messages.push(this.$t('errors.500'))
            this.messages.push(this.$t('errors.contactIfError'))
            break
          default:
            this.messages.push(this.$t('errors.unhandled') + ' ' + error.response.data.reason + '. ' + error.response.data.message)
            this.messages.push(this.$t('errors.contactIfError'))
        }
      }
    }
  },
  created (event) {
    eventHub.$on(eventHub.eventCommunicationError, event => {
      this.messages = []
      this.notifyRequestError(event)
    })
    eventHub.$on(eventHub.eventMetamaskNetworkError, requiredNetworkName => {
      this.$notify({
        title: this.$t('errors.information'),
        message: this.$t('errors.metamaskDetected') + requiredNetworkName,
        type: 'warning'
      })
    })
    eventHub.$on(eventHub.eventMetamaskAccountWasNotFound, () => {
      this.$notify({
        title: this.$t('errors.information'),
        message: this.$t('errors.useMetamask'),
        type: 'warning'
      })
    })
  }
}

</script>
<style>
  .notification-dialog li {
    list-style: none;
    font-size: 16px;
    color: black;
    margin-bottom: 10px;
  }

  .notification-dialog .dialog-footer {
    display: block;
    width: 100%;
    text-align: center;
  }

  .notification-dialog .el-dialog__body {
    padding-left: 20px;
  }

  .notification-dialog .aig-button {
    width: 140px;
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
