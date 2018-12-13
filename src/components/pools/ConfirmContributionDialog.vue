<template>
  <el-dialog :title="$t('pools.confirmationDialog.title')" :visible.sync="show" width="100%" center>
    <template>
      <div class="dialog-body">
        <div>
          <h4 class="info-title">{{ $t('pools.confirmationDialog.maxAllowedAmount') }}:</h4>
          <p>{{ maxAllowedAmount }} {{ $t('general.aix') }}</p>
        </div>
        <div>
          <h4 class="info-title">{{ $t('pools.confirmationDialog.amount') }}:</h4>
          <el-form
            @submit.prevent.native="submitForm('addContributionForm', addContribution)"
            :rules="formRules"
            :model="addContributionForm"
            class="add-contribution-form"
            ref="addContributionForm"
          >
            <el-form-item prop="amount">
              <el-input
                v-model="addContributionForm.amount"
                v-on:keyup.enter="submitForm('addContributionForm', addContribution)"
                class="amount-input"
              >
                <template slot="append">{{ $t('general.aix') }}</template>
              </el-input>
            </el-form-item>
          </el-form>
        </div>

        <div slot="footer" class="dialog-footer">
          <el-button @click="onCancel">{{ $t('general.cancel') }}</el-button>
          <el-tooltip
            :disabled="contributeButtonEnabled"
            effect="dark"
            :content="$t('pools.userNotLoggedIn')"
            placement="top"
          >
            <span class="wrapper el-button">
              <el-button
                class="button"
                :disabled="!contributeButtonEnabled"
                type="primary"
                @click.prevent.native="submitForm('addContributionForm', addContribution)"
              >
                {{ $t('pools.confirmationDialog.buttons.contribute') }}
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
  props: ['isVisible', 'displayDialog', 'maxAllowedAmount'],
  mixins: [FormMixin],
  data () {
    const checkAmount = (rule, value, callback) => {
      if (Number(value) <= 0) {
        return callback(new Error(this.$t('pools.confirmationDialog.validation.shouldBeBiggerThanZero')))
      }

      if (Number(value) > this.maxAllowedAmount) {
        return callback(
          new Error(this.$t('pools.confirmationDialog.validation.shouldBeLowerOrEqualMaxAllowedAmount'))
        )
      }

      callback()
    }

    return {
      addContributionForm: {
        amount: ''
      },
      formRules: {
        amount: [
          {
            required: true,
            message: this.$t('pools.confirmationDialog.validation.required'),
            trigger: 'blur'
          },
          {
            validator: checkAmount,
            trigger: 'blur'
          },
          {
            pattern: /^(?:\d{1,6}\.\d{1,6}|[0-9]\d{0,5})$/,
            message: this.$t('pools.confirmationDialog.validation.amountInvalid'),
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
    contributeButtonEnabled () {
      return !!(this.$store.getters['user/isAuthenticated'] && this.$store.getters['user/isWeb3Enabled'])
    }
  },
  methods: {
    addContribution () {
      this.$emit('addContribution', this.addContributionForm.amount)
    },
    onCancel () {
      this.show = false
      this.resetForm('addContributionForm')
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

    .add-contribution-form {
      margin-top: 15px;
    }

    .dialog-footer {
      text-align: center;

      span {
        margin: 15px 0;
        width: 150px;
        display: inline-block;
      }
    }

    .el-button {
      width: 150px;
    }
  }
</style>
