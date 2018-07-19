<template>
  <el-dialog class="download-app-dialog" :title="title" :visible.sync="show" width="100%" center>

    <template>
      <span>
        <p>{{ $t('insurance.product.instructionsIntro') }}</p>
        <ol>
          <li>{{ $t('insurance.product.instructionsDownloadApp') }}</li>
          <li>{{ $t('insurance.product.instructionsIMEI') }}</li>
        </ol>

        <el-form @submit.prevent.native="submitForm('deviceIdForm', handleSubmit)" :rules="deviceIdFormRules" :model="deviceIdForm"
          ref="deviceIdForm" class="device-id-form">

          <el-form-item prop="id">
            <el-input v-on:keyup.enter="submitForm('deviceIdForm', handleSubmit)" class="device-id-input" :placeholder="$t('insurance.product.deviceIdPlaceholder')"
              :maxlength="8" v-model="deviceIdForm.id"></el-input>
          </el-form-item>

        </el-form>
        <p>{{ $t('insurance.product.instructionsConditions') }}</p>
      </span>

      <span slot="footer" class="dialog-footer">
        <el-button @click="show=false">{{ $t('general.cancel') }}</el-button>
        <el-button type="primary" @click.prevent.native="submitForm('deviceIdForm', calculatePremium)">{{ $t('general.continue') }}</el-button>
      </span>
    </template>
    <!--
    <template v-else>
      <p>{{ $t('insurance.product.notImplemented') }}</p>
    </template> -->

  </el-dialog>
</template>
<script>
import FormMixin from '@/components/mixins/FormMixin'
import { mapGetters } from 'vuex'

export default {
  props: ['displayDialog', 'isVisible'],
  mixins: [FormMixin],
  data () {
    return {
      deviceIdForm: {
        id: ''
      },
      deviceIdFormRules: {
        id: [{
          required: true,
          message: this.$t('insurance.product.validation.deviceIdRequired'),
          trigger: 'blur'
        },
        {
          min: 8,
          message: this.$t('insurance.product.validation.deviceIdInvalid'),
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    ...mapGetters(['product']),
    show: {
      get () {
        return this.isVisible
      },
      set (value) {
        this.displayDialog(value)
      }
    },
    title () {
      return this.$t('insurance.product.downloadApp')
    }
  },
  methods: {
    calculatePremium () {
      this.show = false
      this.$router.push(
        {
          name: 'PolicyDraftLoader',
          params: {
            deviceId: this.deviceIdForm.id.toUpperCase()
          }
        })
    }
  }
}

</script>

<style lang="scss">
  @import '~helpers/variables';

  .download-app-dialog li {
    font-size: 16px;
    line-height: 24px;
  }

  .app-link {
    color: $light-blue;
  }

  .device-id-input {
    width: 115px;
    display: inline-block;

    input {
      text-transform: uppercase;
    }
  }

  .device-id-form {
    text-align: center;

    .el-form-item {
      width: 115px;
      display: inline-block;
    }
  }
</style>
