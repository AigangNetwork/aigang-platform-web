<template>
  <div v-loading="deactivating">
    <el-row class="profile-password-container">
      <el-col>
        <p class="input-section-title">{{ $t('profile.general.deactivateAccountTitle') }}</p>
      </el-col>
      <el-col>
        <p class="profile-section-decription">{{ $t('profile.general.deactivateAccountDescription') }}</p>
      </el-col>
      <el-row>
        <el-button @click="dialogVisible = true" class="profile-button">
          {{ $t('profile.general.deactivateAccount') }}
        </el-button>
      </el-row>
    </el-row>
    <Dialog :title="$t('profile.general.warning')" :body="$t('profile.general.confirmationText')" :on-confirm="deactivateAccount"
      :is-visible="dialogVisible" :on-cancel="cancel" />
  </div>
</template>
<script>
import Dialog from '@/components/common/Dialog'
export default {
  components: {
    Dialog
  },
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
          message: this.$t('profile.general.deactivationSuccessful')
        })
        this.$store.dispatch('user/logOut')
        this.$router.push('/data')
      }).catch(e => {
        this.deactivating = false
      })
    },
    cancel () {
      this.dialogVisible = false
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
