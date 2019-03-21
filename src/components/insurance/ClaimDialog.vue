<template>
  <el-dialog class="download-app-dialog" :title="title" :visible.sync="show" width="100%" center>

    <template>
      <span>
        <p>{{ $t('insurance.product.instructionsIMEI') }}</p>

        <el-form @submit.prevent.native="submitForm('deviceIdForm', createPolicy)" :rules="deviceIdFormRules"
          :model="deviceIdForm" ref="deviceIdForm" class="device-id-form">

          <el-form-item prop="id">
            <el-input v-on:keyup.enter="submitForm('deviceIdForm', createPolicy)" class="device-id-input"
              :placeholder="$t('insurance.product.deviceIdPlaceholder')" :maxlength="8" v-model="deviceIdForm.id">
            </el-input>
          </el-form-item>

        </el-form>
        <p>{{ $t('insurance.product.instructionsConditions') }}</p>
      </span>

      <span slot="footer" class="dialog-footer">
        <el-button @click="show=false">{{ $t('general.cancel') }}</el-button>
        <el-button type="primary" @click.prevent.native="submitForm('deviceIdForm', createPolicy)">
          {{ $t('general.continue') }}</el-button>
      </span>
    </template>

  </el-dialog>
</template>
<script>
import FormMixin from '@/components/mixins/FormMixin'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('insurance')

export default {
  props: ['displayDialog', 'isVisible', 'deviceId'],
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
    ...mapGetters(['policyLoadingInfo']),
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
    ...mapActions(['verifyClaim']),
    async createPolicy () {
      this.show = false

      await this.verifyClaim({
        deviceId: this.deviceIdForm.id.toUpperCase(),
        productTypeId: this.$route.params.type,
        productAddress: this.$route.params.address
      })
    }
  }
}

</script>

<style lang="scss">
  @import '~helpers/variables';

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
