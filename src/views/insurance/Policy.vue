<template>
  <div class="aig-container aig-view">
    <transition name="fade" mode="out-in">
      <Card class="policy-card">
        <div slot="body" class="policy-details-body">
          <el-row class="policy-data">
            <h2>{{ $t('insurance.policy.androidBatteryInsurancePolicy') }}</h2>
            <p>
              <label>{{ $t('insurance.policy.deviceId') }}:</label>
              {{ policy.deviceId }}
            </p>

            <p>
              <label>{{ $t('insurance.product.calculatedPremium') }}:</label>
              {{ policy.premium }}
              <span class="text-medium"> {{ $t('general.aix') }} </span>
            </p>

            <p>
              <label>{{ $t('insurance.product.payout') }}:</label>
              {{ policy.payout }}
              <span class="text-medium"> {{ $t('general.aix') }} </span>
            </p>

            <p>
              <label>{{ $t('insurance.product.fee') }}:</label>
              {{ policy.fee }}
              <span class="text-medium"> %
              </span>
            </p>
          </el-row>
          <el-row class="device-data">
            <p class="device-data-title">{{ $t('insurance.policy.deviceData.deviceData') }}</p>

            <div class="device-data-item">
              <label>{{ $t('insurance.policy.deviceData.wearLevel') }}:</label>
              {{ deviceData.WearLevel | uppercase }}
            </div>

            <div class="device-data-item">
              <label>{{ $t('insurance.policy.deviceData.batteryDesignCapacity') }}:</label>
              {{ deviceData.BatteryDesignCapacity }}
            </div>

            <div class="device-data-item">
              <label>{{ $t('insurance.policy.deviceData.chargeLevel') }}:</label>
              {{ deviceData.ChargeLevel }} %
            </div>

            <div class="device-data-item">
              <label>{{ $t('insurance.policy.deviceData.ageInMonths') }}:</label>
              {{ deviceData.AgeInMonths }}
            </div>

            <div class="device-data-item">
              <label>{{ $t('insurance.policy.deviceData.cpuUsage') }}:</label>
              {{ deviceData.CpuUsage }} %
            </div>

            <div class="device-data-item">
              <label>{{ $t('insurance.policy.deviceData.region') }}:</label>
              {{ deviceData.Region | uppercase}}
            </div>

            <div class="device-data-item">
              <label>{{ $t('insurance.policy.deviceData.brand') }}:</label>
              {{ deviceData.Brand | uppercase }}
            </div>

            <div class="device-data-item">
              <label>{{ $t('insurance.policy.deviceData.fetchDateTime') }}:</label>
              {{ deviceData.FetchDateTime }}
            </div>

          </el-row>
          <el-form :rules="policyFormRules" :model="policyForm" ref="policyForm">
            <el-row>
              <el-col>
                <el-form-item prop="isTermsAndConditionsAgreed">
                  <p class="checkbox-description">{{ $t('insurance.policy.termsAndConditionsDescription') }}
                    <span @click="isDialogVisible = !isDialogVisible" class="bold">{{ $t('insurance.product.termsAndConditions') }}</span>
                  </p>
                  <el-checkbox class="aig-checkbox" :label="$t('insurance.policy.agreeWithTermsAndConds' )" v-model="policyForm.isTermsAndConditionsAgreed"></el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item class="button-container">
              <el-button class="aig-button" type="primary" @click.prevent.native="submitForm('policyForm', sendPolicyPayment)">
                {{ $t('insurance.product.insure') }}
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </Card>
    </transition>

    <TermsAndConditionsDialog :isVisible="isDialogVisible" :displayDialog="displayDialog" :termsAndConditions="policy.termsAndConditions"
    />
  </div>

</template>
<script>
import Card from '@/components/Card'
import TermsAndConditionsDialog from '@/components/insurance/TermsAndConditionsDialog'
import FormMixin from '@/components/mixins/FormMixin'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: { Card, TermsAndConditionsDialog },
  mixins: [FormMixin],
  data () {
    const checkTermsAndConditionsAgreed = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('insurance.policy.mustAgreeWithTermsAndConds')))
      } else {
        callback()
      }
    }

    return {
      deviceData: '',
      isDialogVisible: false,
      policyForm: {
        isTermsAndConditionsAgreed: false
      },
      policyFormRules: {
        isTermsAndConditionsAgreed: [{
          type: 'boolean',
          required: true,
          validator: checkTermsAndConditionsAgreed
        }]
      }
    }
  },
  methods: {
    ...mapActions(['getPolicy', 'sendPolicyPayment']),
    displayDialog (value) {
      this.isDialogVisible = value
    }
  },
  computed: {
    ...mapGetters(['policy'])
  },
  async mounted () {
    await this.getPolicy(this.$route.params.policyId)
    this.deviceData = JSON.parse(this.policy.properties)
  }
}
</script>
<style lang="scss">
  @import '~helpers/variables';

  .aig-container {
    align-items: flex-start;
  }

  .device-data-title {
    background: #dcdfe6;
    font-weight: 400;
    text-align: center;
    color: black;
  }

  .device-data-item {
    border-bottom: 1px dotted #c8d1f1;
    padding: 5px;
    display: flex;
    flex-direction: row;

    label {
      font-weight: 300;
      flex-grow: 1;
    }

  }

  .device-data {
    font-family: $font-secondary;
    margin-bottom: 20px;
  }

  .policy-data {
    margin-bottom: 20px;

    p {
      margin-bottom: 0;
      height: 38px;
      display: flex;
      flex-direction: row;
      font-size: 24px;
      border-bottom: 1px dotted #c8d1f1;
      font-weight: 400;
      line-height: 38px;

      &:first-child {
        border-top: 1px dotted #c8d1f1;
      }
    }

    label {
      font-weight: 300;
      flex-grow: 1;
      font-size: 16px;
    }

    .text-medium {
      line-height: 44px;
      margin-left: 5px;
      font-weight: 300;
    }
  }

  .checkbox-description .bold:hover {
    cursor: pointer;
  }

  @media screen and (min-width: 100px) and (max-width: 350px) {
    .el-checkbox__label {
      font-size: 13px;
    }
  }
</style>
