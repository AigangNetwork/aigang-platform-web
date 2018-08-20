<template>
  <el-row class="profile-password-container">
    <el-col>
      <p class="input-section-title">{{ $t('insurance.policy.deletePolicyTitle') }}</p>
    </el-col>
    <el-col>
      <p class="profile-section-decription">{{ $t('insurance.policy.deletePolicyBody') }}</p>
    </el-col>
    <el-row>
      <el-button @click="dialogVisible = true" class="profile-button">
        {{$t('insurance.policy.deletePolicy')}}
      </el-button>
    </el-row>

    <Dialog :title="$t('profile.general.warning')" :body="$t('insurance.policy.deletePolicyConfirmation')" :on-confirm="deletePolicyHandler"
      :is-visible="dialogVisible" :on-cancel="cancel" />

  </el-row>
</template>
<script>
import Dialog from '@/components/common/Dialog'
import { mapActions } from 'vuex'

export default {
  components: {
    Dialog
  },
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    ...mapActions(['deletePolicy']),
    cancel () {
      this.dialogVisible = false
    },
    async deletePolicyHandler () {
      this.dialogVisible = false
      await this.deletePolicy(this.$route.params.policyId)

      this.$router.push({ name: 'MyPolicyList' })
    }
  }
}
</script>
<style lang="scss" scoped>
  .input-section-title {
    margin-top: 20px;
  }
</style>
