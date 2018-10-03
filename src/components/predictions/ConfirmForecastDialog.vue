<template>
  <el-dialog :title="$t('predictions.confirmationDialog.title')" :visible.sync="show" width="100%" center>
    <template>
      <div class="dialog-body">
        <div>
          <h4>{{ $t('predictions.confirmationDialog.prediction') }}:</h4>
          <p>{{ prediction }}</p>
        </div>
        <div>
          <h4>{{ $t('predictions.confirmationDialog.forecast') }}:</h4>
          <p>{{ selectedOutcome.name }}</p>
        </div>

        <div>
          <h4>{{ $t('predictions.confirmationDialog.amount') }}:</h4>
          <el-form @submit.prevent.native="submitForm('createForecastForm', createForecast)" :rules="formRules" :model="createForecastForm"
            class="create-forecast-form" ref="createForecastForm">
            <el-form-item prop="amount">
              <el-input v-model.number="createForecastForm.amount" v-on:keyup.enter="submitForm('createForecastForm', createForecast)"
                maxlength="10" class="amount-input">
                <template slot="append">{{ $t('general.aix')}}</template>
              </el-input>
            </el-form-item>
          </el-form>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="onCancel">{{ $t('general.cancel') }}</el-button>
          <el-tooltip :disabled="forecastButtonEnabled" effect="dark" :content="$t('predictions.confirmationDialog.userNotLoggedIn')"
            placement="top">
            <span class="wrapper el-button">
              <el-button class="button" :disabled="!forecastButtonEnabled" type="primary" @click.prevent.native="submitForm('createForecastForm', createForecast)">
                {{ $t('predictions.confirmationDialog.buttons.forecast')}}
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
  props: ['prediction', 'selectedOutcome', 'isVisible', 'displayDialog'],
  mixins: [FormMixin],
  data () {
    let checkAmount = (rule, value, callback) => {
      if (value === 0) {
        return callback(new Error(this.$t('predictions.confirmationDialog.validation.shouldBeBiggerThanZero')))
      }

      callback()
    }

    return {
      createForecastForm: {
        amount: ''
      },
      formRules: {
        amount: [{
          required: true,
          message: this.$t('predictions.confirmationDialog.validation.required'),
          trigger: 'blur'
        },
        {
          type: 'number',
          message: this.$t('predictions.confirmationDialog.validation.shouldBeNumber'),
          trigger: 'blur'
        },
        {
          validator: checkAmount,
          trigger: 'blur'
        }]
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
      return !!((this.$store.getters['user/isAuthenticated'] && this.$store.getters['user/web3']))
    }
  },
  methods: {
    createForecast () {
      this.$emit('createForecast', {
        amount: parseInt(this.createForecastForm.amount),
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
    h4 {
      margin-bottom: 0px;
    }

    .create-forecast-form {
      margin-top: 15px;
    }

    .dialog-footer {
      text-align: center;
    }
  }
</style>
