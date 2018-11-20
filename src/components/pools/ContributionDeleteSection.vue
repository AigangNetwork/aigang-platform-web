<template>
  <div>
      <h4 class="info-title">{{ $t('pools.contribution.deleteForecastTitle') }}</h4>
      <p>{{ $t('pools.contribution.deleteForecastBody') }}</p>
      <el-button @click="dialogVisible = true" class="profile-button">
        {{$t('pools.contribution.deleteContribution')}}
      </el-button>
      <Dialog
        :title="$t('profile.general.warning')"
        :body="$t('pools.contribution.deleteContributionDialog.body')"
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
</style>
