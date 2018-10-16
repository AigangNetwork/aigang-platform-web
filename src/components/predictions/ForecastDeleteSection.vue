<template>
  <el-row class="profile-password-container">
    <el-col>
      <h4 class="info-title">{{ $t('predictions.forecast.deleteForecastTitle') }}</h4>
    </el-col>
    <el-col>
      <p>{{ $t('predictions.forecast.deleteForecastBody') }}</p>
    </el-col>
    <el-row>
      <el-button @click="dialogVisible = true" class="profile-button">
        {{$t('predictions.forecast.deleteForecast')}}
      </el-button>
    </el-row>

    <Dialog :title="$t('profile.general.warning')" :body="$t('predictions.forecast.deleteForecastConfirmation')" :on-confirm="deleteHandler"
      :is-visible="dialogVisible" :on-cancel="cancel" :displayDialog="displayDialog" />

  </el-row>
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
      await this.$store.dispatch('predictions/deleteForecast', this.$route.params.id)

      this.$router.push({ name: 'MyForecastsList' })
    }
  }
}
</script>
<style lang="scss" scoped>
  .input-section-title {
    margin-top: 20px;
  }
</style>
