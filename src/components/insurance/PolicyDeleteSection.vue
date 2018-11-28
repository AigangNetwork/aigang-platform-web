<template>
  <div>
      <p class="input-section-title">{{ $t('insurance.policy.deletePolicyTitle') }}</p>
      <p>{{ $t('insurance.policy.deletePolicyBody') }}</p>
      <el-button @click="dialogVisible = true" class="profile-button">
        {{$t('insurance.policy.deletePolicy')}}
      </el-button>
      <Dialog
        :title="$t('profile.general.warning')"
        :body="$t('insurance.policy.deletePolicyConfirmation')"
        :on-confirm="deleteHandler"
        :is-visible="dialogVisible"
        :on-cancel="cancel"
        :displayDialog="displayDialog" />

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
      dialogVisible: false
    }
  },
  methods: {
    cancel () {
      this.dialogVisible = false
    },
    displayDialog (value) {
      this.dialogVisible = value
    },
    async deleteHandler () {
      this.dialogVisible = false
      await this.$store.dispatch('insurance/deletePolicy', this.$route.params.policyId)

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
