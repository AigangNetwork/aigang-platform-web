<template>
  <el-dialog :title="$t('predictions.prediction.confirmationDialog.title')" :visible.sync="show" width="100%" center>
    <template>
      <div class="dialog-body">
        <div>
          <h4 class="info-title">{{ $t('predictions.prediction.confirmationDialog.prediction') }}:</h4>
          <p>{{ prediction }}</p>
        </div>
        <div>
          <h4 class="info-title">{{ $t('predictions.prediction.confirmationDialog.forecast') }}:</h4>
          <p>{{ selectedOutcome.name }}</p>
        </div>

        <div>
          <h4 class="info-title">{{ $t('predictions.prediction.confirmationDialog.amount') }}:</h4>
          <el-form
            @submit.prevent.native="submitForm('createForecastForm', createForecast)"
            :rules="formRules"
            :model="createForecastForm"
            class="create-forecast-form"
            ref="createForecastForm">
            <el-form-item prop="amount">
              <el-input
                v-model="createForecastForm.amount"
                v-on:keyup.enter="submitForm('createForecastForm', createForecast)"
                class="amount-input">
                <template slot="append">{{ $t('general.aix') }}</template>
              </el-input>
            </el-form-item>
          </el-form>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="onCancel">{{ $t('general.cancel') }}</el-button>
          <el-tooltip
            :disabled="forecastButtonEnabled"
            effect="dark"
            :content="$t('general.userNotLoggedIn')"
            placement="top">
            <span class="wrapper el-button">
              <el-button
                class="button"
                :disabled="!forecastButtonEnabled"
                type="primary"
                @click.prevent.native="submitForm('createForecastForm', createForecast)">
                {{ $t('predictions.prediction.confirmationDialog.buttons.forecast') }}
              </el-button>
            </span>
          </el-tooltip>
        </div>
      </div>
    </template>
  </el-dialog>
</template>
<script>
import FormMixin from '@/components/mixins/FormMixin'

export default {
  props: ['prediction', 'selectedOutcome', 'isVisible', 'displayDialog', 'fee'],
  mixins: [FormMixin],
  data () {
    const checkAmount = (rule, value, callback) => {
      if (value <= 0) {
        return callback(
          new Error(this.$t('predictions.prediction.confirmationDialog.validation.shouldBeBiggerThanZero'))
        )
      }

      if (value <= this.fee) {
        return callback(
          new Error(this.$t('predictions.prediction.confirmationDialog.validation.shouldBeBiggerThanFee'))
        )
      }

      callback()
    }

    return {
      createForecastForm: {
        amount: ''
      },
      formRules: {
        amount: [
          {
            required: true,
            message: this.$t('predictions.prediction.confirmationDialog.validation.required'),
            trigger: 'blur'
          },
          {
            pattern: /^(?:\d{1,6}\.\d{1,6}|[0-9]\d{0,5})$/,
            message: this.$t('predictions.prediction.confirmationDialog.validation.amountInvalid'),
            trigger: 'blur'
          },
          {
            validator: checkAmount,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    show: {
      get () {
        return this.isVisible
      },
      set (value) {
        this.displayDialog(value)
      }
    },
    forecastButtonEnabled () {
      return this.$store.getters['user/isWeb3Enabled']
    }
  },
  methods: {
    createForecast () {
      if (this.$store.getters['user/aixBalance'] <= this.createForecastForm.amount) {
        this.show = false
        this.$store.dispatch('showInsufficientBalanceDialog', true)
        return
      }

      this.$emit('createForecast', {
        amount: this.createForecastForm.amount,
        selectedOutcomeIndex: this.selectedOutcome.index,
        selectedOutcomeId: this.selectedOutcome.id
      })
    },
    onCancel () {
      this.show = false
      this.resetForm('createForecastForm')
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="scss" scoped>
  .dialog-body {
    .info-title {
      margin-top: 0px;
    }

    .create-forecast-form {
      margin-top: 15px;
    }

    .dialog-footer {
      text-align: center;
    }

    .el-button {
      width: 150px;
    }
  }
</style>
