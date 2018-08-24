<template>
  <div class="aig-container aig-view" v-loading="loading">
    <transition v-if="!loading" name="fade" mode="out-in">
      <Card class="policy-card">
        <div v-if="!loading" slot="body" class="policy-details-body">
          <el-row class="header">
            <router-link :to="policyListRoute" class="back-button">
              <i class="back-icon el-icon-arrow-left"></i>
            </router-link>

            <h2>{{ $t('insurance.policy.androidBatteryInsurancePolicy') }}</h2>
          </el-row>

          <el-row class="content">
            <PolicyInfo :policy="policy" />
            <DeviceInfo :data="deviceData" />
            <ClaimInfo :data="claimProperties" />
          </el-row>

          <el-row class="footer">

            <el-button v-if="policy.status && policy.status.toUpperCase() === 'DRAFT'" class="aig-button" type="primary" @click.prevent.native="insure">{{ $t('insurance.policy.pay') }}</el-button>

            <el-col v-else-if="policy.status && policy.status.toUpperCase() === 'PENDINGPAYMENT'">
              <el-button class="aig-button" disabled type="primary">{{ $t('insurance.policy.verifyForClaim') }}</el-button>
            </el-col>

            <el-col v-else-if="policy.status && policy.status.toUpperCase() === 'PAID'">
              <div v-if="policy.isVerifyForClaimFailed" class="failed-notification">
                <span>{{ $t('insurance.policy.failedToVerifyDevice.title') }}</span>
                <ul>
                  <li>{{ $t('insurance.policy.failedToVerifyDevice.tip1') }}</li>
                  <li>{{ $t('insurance.policy.failedToVerifyDevice.tip2') }}</li>
                  <li>{{ $t('insurance.policy.failedToVerifyDevice.tip3') }}</li>
                </ul>
              </div>
              <div v-else-if="!policy.isClaimable" class="failed-notification">
                <span>{{ $t('insurance.policy.deviceNotClaimable') }}</span>
              </div>
              <el-button class="aig-button" type="primary" @click.prevent.native="verifyClaim">
                {{ policy.isVerifyForClaimFailed ? $t('insurance.policy.verifyForClaimRetry') : $t('insurance.policy.verifyForClaim') }}
              </el-button>
            </el-col>

            <el-col v-else-if="policy.status && policy.status.toUpperCase() === 'CLAIMABLE'">
              <el-button class="aig-button" type="primary" @click.prevent.native="claim">{{ $t('insurance.policy.claim') }}
              </el-button>
            </el-col>
          </el-row>

          <PolicyDeleteSection v-if="isPolicyDraft" />

        </div>
      </Card>
    </transition>

    <TermsAndConditionsDialog :termsAndConditions="policy.termsAndConditions" :isVisible="isTermsAndConditionsDialogVisible"
      :displayDialog="displayTermsAndConditionsDialog" @agreed="makePayment" />

    <LogInToEthereumClientDialog :isVisible="isDisplayLogInToEthereumClientDialogVisible" :displayDialog="displayLogInToEthereumClientDialog"
    />

    <PaymentConfirmationDialog :isVisible="isPaymentDialogVisible" :displayDialog="displayPaymentDialog" />
  </div>
</template>
<script>
import Card from '@/components/Card'
import PaymentConfirmationDialog from '@/components/insurance/PaymentConfirmationDialog'
import TermsAndConditionsDialog from '@/components/insurance/TermsAndConditionsDialog'
import LogInToEthereumClientDialog from '@/components/insurance/LogInToEthereumClientDialog'
import PolicyDeleteSection from '@/components/insurance/PolicyDeleteSection'
import PolicyInfo from './PolicyInfo'
import DeviceInfo from './DeviceInfo'
import ClaimInfo from './ClaimInfo'
import {
  mapGetters,
  mapActions
} from 'vuex'

export default {
  components: {
    Card,
    PaymentConfirmationDialog,
    TermsAndConditionsDialog,
    LogInToEthereumClientDialog,
    PolicyInfo,
    DeviceInfo,
    ClaimInfo,
    PolicyDeleteSection
  },
  data () {
    return {
      isTermsAndConditionsDialogVisible: false,
      isPaymentDialogVisible: false,
      isDisplayLogInToEthereumClientDialogVisible: false,

      policyListRoute: '/insurance/policy/mypolicies'
    }
  },
  methods: {
    ...mapActions(['getPolicy', 'sendPolicyPayment']),
    displayPaymentDialog (value) {
      this.isPaymentDialogVisible = value
    },
    displayLogInToEthereumClientDialog (value) {
      this.isDisplayLogInToEthereumClientDialogVisible = value
    },
    displayTermsAndConditionsDialog (value) {
      this.isTermsAndConditionsDialogVisible = value
    },
    insure () {
      if (this.isMetamaskLoggedIn) {
        this.displayTermsAndConditionsDialog(true)
      } else {
        this.displayLogInToEthereumClientDialog(true)
      }
    },
    async makePayment () {
      this.displayTermsAndConditionsDialog(false)
      await this.sendPolicyPayment()
    },
    verifyClaim () {
      this.$store.dispatch('verifyClaim')
    },
    claim () {
      this.$store.dispatch('claim')
    }
  },
  computed: {
    ...mapGetters(['policy', 'web3', 'loading']),
    isMetamaskLoggedIn () {
      return !!this.web3
    },
    deviceData () {
      return this.policy.properties ? JSON.parse(this.policy.properties) : null
    },
    claimProperties () {
      return this.policy.claimProperties ? JSON.parse(this.policy.claimProperties) : null
    },
    isPolicyDraft () {
      if (this.policy.status) {
        const status = this.policy.status.toUpperCase()
        return status === 'DRAFT'
      }
    }
  },
  async mounted () {
    await this.getPolicy(this.$route.params.policyId)
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
        margin-bottom: 32px;
        .error-message {
          margin-top: 30px;
          text-align: center;
          color: $red;
        }
      }
    }
  }

  .failed-notification {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .checkbox-description .bold:hover {
    cursor: pointer;
  }

  .wrapper.el-button {
    width: 100%;
  }

  @media screen and (max-width: 680px) {
    .aig-container {
      .policy-card {
        .header {
          .back-icon {
            margin-top: 20px;
          }
        }
      }
    }
  }

</style>
