<template>
  <div class="delete-button-container">
    <p class="input-section-title">{{ $t('pools.contributions.deleteContributionTitle') }}</p>
    <p>{{ $t('pools.contributions.deleteContributionBody') }}</p>
    <el-button @click="dialogVisible = true" class="profile-button">
      {{$t('pools.contributions.deleteContribution')}}
    </el-button>
    <Dialog
      :title="$t('profile.general.warning')"
      :body="$t('pools.contributions.deleteContributionConfirmation')"
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
      await this.$store.dispatch('pools/deleteContribution', this.$route.params.id)

      this.$router.push({ name: 'Portfolio' })
    }
  }
}
</script>
<style lang="scss" scoped>
  .input-section-title {
    margin-top: 20px;
  }

  .delete-button-container {
    margin-bottom: 40px;

    .profile-button {
      width: 180px;
    }
  }
</style>
