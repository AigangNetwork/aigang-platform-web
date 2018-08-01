<template>
  <div class="aig-container aig-view">
    <transition name="fade" mode="out-in">
      <Card class="policy-card" v-loading="loading" :element-loading-text="$t('general.loading')">
        <div slot="body" class="policy-details-body">
          <el-row class="header">
              <router-link :to="policyListRoute" class="back-button">
                <i class="back-icon el-icon-arrow-left"></i>
              </router-link>

              <h2>{{ $t('insurance.policy.androidBatteryInsurancePolicy') }}</h2>
          </el-row>

          <div class="content">
            <PolicyInfo :data="policy" />
            <ClaimInfo :data="policy.paymentData" />
            <DeviceInfo :data="deviceData" />
          </div>

          <div class="footer">
            <el-button
              v-if="policy.status && policy.status.toUpperCase() === 'DRAFT'"
              class="aig-button"
              type="primary"
              @click.prevent.native="insure">{{ $t('insurance.policy.insure') }}</el-button>

            <el-button
              v-if="policy.status && policy.status.toUpperCase() === 'PENDINGPAYMENT'"
              class="aig-button"
              disabled="true"
              type="primary">{{ $t('insurance.policy.verifyForClaim') }}</el-button>

            <el-button
              v-if="policy.status && policy.status.toUpperCase() === 'PAID'"
              class="aig-button"
              type="primary"
              @click.prevent.native="verifyClaim">{{ $t('insurance.policy.verifyForClaim') }}</el-button>

            <el-button
              v-else-if="policy.status && policy.status.toUpperCase() === 'CLAIMABLE'"
              class="aig-button"
              type="primary"
              @click.prevent.native="claim">{{ $t('insurance.policy.claim') }}</el-button>
          </div>
        </div>
      </Card>
    </transition>

    <TermsAndConditionsDialog :termsAndConditions="policy.termsAndConditions" :isVisible="isTermsAndConditionsDialogVisible" :displayDialog="displayTermsAndConditionsDialog" @agreed="makePayment"/>

    <LogInToMetamaskDialog :isVisible="isDisplayLoginToMetamaskDialogVisible" :displayDialog="displayLoginToMetamaskDialog" />

    <PaymentConfirmationDialog :isVisible="isPaymentDialogVisible" :displayDialog="displayPaymentDialog" />
  </div>

</template>
<script>
import Card from '@/components/Card'
import PaymentConfirmationDialog from '@/components/insurance/PaymentConfirmationDialog'
import TermsAndConditionsDialog from '@/components/insurance/TermsAndConditionsDialog'
import LogInToMetamaskDialog from '@/components/insurance/LogInToMetamaskDialog'
import PolicyInfo from './PolicyInfo'
import DeviceInfo from './DeviceInfo'
import ClaimInfo from './ClaimInfo'
import FormMixin from '@/components/mixins/FormMixin'
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    Card,
    PaymentConfirmationDialog,
    TermsAndConditionsDialog,
    LogInToMetamaskDialog,
    PolicyInfo,
    DeviceInfo,
    ClaimInfo
  },
  mixins: [FormMixin],
  data () {
    return {
      deviceData: '',
      isTermsAndConditionsDialogVisible: false,
      isPaymentDialogVisible: false,
      isDisplayLoginToMetamaskDialogVisible: false,

      policyListRoute: '/insurance/mypolicies'
    }
  },
  methods: {
    ...mapActions(['getPolicy', 'sendPolicyPayment']),
    displayPaymentDialog (value) {
      this.isPaymentDialogVisible = value
    },
    displayLoginToMetamaskDialog (value) {
      this.isDisplayLoginToMetamaskDialogVisible = value
    },
    displayTermsAndConditionsDialog (value) {
      this.isTermsAndConditionsDialogVisible = value
    },
    insure () {
      if (this.isMetamaskLoggedIn) {
        this.displayTermsAndConditionsDialog(true)
      } else {
        this.displayLoginToMetamaskDialog(true)
      }
    },
    verifyClaim () {
      this.$store.dispatch('verifyClaim')
    },
    claim () {
      this.$store.dispatch('claim')
    },
    async makePayment () {
      this.displayTermsAndConditionsDialog(false)
      await this.sendPolicyPayment()
    }
  },
  computed: {
    ...mapGetters(['policy', 'web3', 'loading']),
    isMetamaskLoggedIn () {
      return !!this.web3
    }
  },
  async mounted () {
    await this.getPolicy(this.$route.params.policyId)
    this.deviceData = JSON.parse(this.policy.properties)
  }
}
</script>
<style lang="scss">
  @import '~helpers/variables';
  @import '~helpers/mixins';

  @include policy-data;

  .aig-container {
    align-items: flex-start;

    .policy-card {
      .header {
        display: flex;
        flex-direction: row;

        .back-icon {
          margin-top: 28px;
          margin-right: 10px;
        }

        h2 {
          flex-grow: 0;
        }
      }
      .footer {
        .error-message {
          margin-top: 30px;
          text-align: center;
          color: $red;
        }
      }
    }
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
    text-align: right;

    label {
      font-weight: 300;
      flex-grow: 1;
      text-align: left;
    }
  }

  .device-data {
    font-family: $font-secondary;
    margin-bottom: 20px;
  }

  .checkbox-description .bold:hover {
    cursor: pointer;
  }

  .wrapper.el-button {
    width: 100%;
  }

  @media screen and (min-width: 100px) and (max-width: 350px) {
    .el-checkbox__label {
      font-size: 13px;
    }
  }
</style>
