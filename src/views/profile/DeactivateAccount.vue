<template>
  <div v-loading="deactivating">
    <el-row class="profile-password-container">
      <el-col>
        <p class="profile-section-title">{{ $t('profile.deactivateAccountTitle') }}</p>
      </el-col>
      <el-col>
        <p class="profile-section-decription">{{ $t('profile.deactivateAccountDescription') }}</p>
      </el-col>
      <el-row>
        <el-button @click="dialogVisible = true" class="profile-button">
          {{ $t('profile.deactivateAccount') }}
        </el-button>
      </el-row>
    </el-row>
    <el-dialog class="notification-dialog" :title="$t('profile.warning')" :visible.sync="dialogVisible" center>
      <div class="confimation-dialog">
        <span>{{ $t('profile.confirmationText') }}</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t('profile.cancel') }}</el-button>
        <el-button type="primary" @click="deactivateAccount">{{ $t('profile.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialogVisible: false,
      deactivating: false
    }
  },
  methods: {
    deactivateAccount () {
      this.deactivating = true
      this.dialogVisible = false
      this.axios.post('account/disable').then(response => {
        this.deactivating = false
        this.$notify.success({
          title: this.$t('data.upload.notifications.titles.success'),
          message: this.$t('profile.deactivationSuccessful')
        })
        this.$store.dispatch('logOut')
        this.$router.push('/data')
      }).catch(e => {
        this.deactivating = false
      })
    }
  }
}

</script>
<style scoped>
  .profile-button {
    margin-top: 35px;
  }

  .confimation-dialog {
    display: flex;
    justify-content: center;
  }

</style>
