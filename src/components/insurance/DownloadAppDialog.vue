<template>
  <el-dialog class="download-app-dialog" :title="$t('insurance.product.downloadApp')" :visible.sync="show" width="100%" center>
    <span>
      <p>{{ $t('insurance.product.instructionsIntro') }}</p>
      <ol>
        <li>
          <a class="app-link" href="https://play.google.com/store/apps/details?id=com.aigang.aigangapp&hl=en" target="_blank">{{ $t('insurance.product.instructionsDownloadApp') }}</a>
        </li>
        <li>{{ $t('insurance.product.instructionsIMEI') }}</li>
      </ol>

      <el-form :rules="imeiFormRules" :model="imeiForm" ref="imeiForm">
        <el-form-item prop="imei">
          <el-input :placeholder="$t('insurance.product.imeiPlaceholder')" v-model="imeiForm.imei"></el-input>
        </el-form-item>
      </el-form>
    </span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="show=false">{{ $t('general.cancel') }}</el-button>
      <el-button type="primary" @click="submitForm('imeiForm', handleSubmit)">{{ $t('general.continue') }}</el-button>
    </span>
  </el-dialog>
</template>
<script>
import FormMixin from '@/components/mixins/FormMixin'

export default {
  props: ['displayDialog', 'isVisible', 'calculatePremium'],
  mixins: [FormMixin],
  data () {
    return {
      imeiForm: {
        imei: ''
      },
      imeiFormRules: {
        imei: [{
          required: true,
          message: this.$t('insurance.product.validation.imeiRequired'),
          trigger: 'blur'
        },
        {
          pattern: /^[0-9]{15}$/,
          message: this.$t('insurance.product.validation.imeiInvalid'),
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
    }
  },
  methods: {
    handleSubmit () {
      this.calculatePremium(this.imeiForm.imei)
    }
  }
}

</script>

<style lang="scss" scoped>
  @import '~helpers/variables';

  .download-app-dialog li {
    font-size: 16px;
    height: 30px;
  }

  .app-link {
    color: $light-blue;

  }
</style>
