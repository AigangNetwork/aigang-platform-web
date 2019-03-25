<template>
  <div class="aig-container aig-view" v-loading="$store.getters.loading">
    <Card class="policy-card" v-if="!$store.getters.loading">
      <div v-show="!$store.getters.loading" slot="body">
        <transition-group name="slideUp" mode="out-in">

          <div key="1" v-if="!isPolicyLoadingVisible && !policyLoadingInfo.isClaimable && !$store.getters.loading">
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
              <el-col v-if="policy.status && policy.status.toUpperCase() === 'PAID' && policy.payout !== '0'">
                <el-button class="aig-button" type="primary" @click.prevent.native="displayClaimDialog(true)">
                  {{ policy.isVerifyForClaimFailed ? $t('insurance.policy.verifyForClaimRetry') : $t('insurance.policy.verifyForClaim') }}
                </el-button>
              </el-col>

              <el-col v-else-if="policy.status && policy.status.toUpperCase() === 'CLAIMABLE'">
                <el-row>
                  <span class="claimable-message">{{ $t('insurance.policy.deviceClaimable') }}</span>
                </el-row>
                <el-button class="aig-button" type="primary" @click.prevent.native="claim">{{ $t('insurance.policy.claim')
                  }}
                </el-button>
              </el-col>
            </el-row>
          </div>

          <VerifyClaimLoadingInfo v-else key="2" />
        </transition-group>
      </div>
    </Card>

    <ClaimDialog :displayDialog="displayClaimDialog" :isVisible="isClaimDialogVisible" />

    <LogInToEthereumClientDialog
      :isVisible="isDisplayLogInToEthereumClientDialogVisible"
      :displayDialog="displayLogInToEthereumClientDialog" />

    <PaymentConfirmationDialog
      :isVisible="isPaymentDialogVisible && !transactionError"
      :displayDialog="displayPaymentDialog"
      :txHash="txHash"
      :title="$t('insurance.policy.paymentInfo.title')"
      :bodyText="$t('insurance.policy.paymentInfo.body')"
      :route="policyListRoute"
      :btnText="$t('insurance.policy.paymentInfo.buttons.goBack')"/>

  </div>
</template>
<script>
import Card from '@/components/Card'
import PaymentConfirmationDialog from '@/components/common/PaymentConfirmationDialog'
import TermsAndConditionsDialog from '@/components/insurance/TermsAndConditionsDialog'
import LogInToEthereumClientDialog from '@/components/insurance/LogInToEthereumClientDialog'
import PolicyInfo from '@/components/insurance/policy/PolicyInfo'
import DeviceInfo from '@/components/insurance/policy/DeviceInfo'
import ClaimInfo from '@/components/insurance/policy/ClaimInfo'
import VerifyClaimLoadingInfo from '@/components/insurance/VerifyClaimLoadingInfo'
import ClaimDialog from '@/components/insurance/ClaimDialog'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('insurance')

export default {
  components: {
    Card,
    PaymentConfirmationDialog,
    TermsAndConditionsDialog,
    LogInToEthereumClientDialog,
    PolicyInfo,
    DeviceInfo,
    ClaimInfo,
    VerifyClaimLoadingInfo,
    ClaimDialog
  },
  data () {
    return {
      isTermsAndConditionsDialogVisible: false,
      isPaymentDialogVisible: false,
      isDisplayLogInToEthereumClientDialogVisible: false,
      isClaimDialogVisible: false,
      policyListRoute: '/insurance/policy/mypolicies'
    }
  },
  methods: {
    ...mapActions(['getPolicy', 'sendPolicyPayment']),
    ...mapMutations({
      clearLoadingInfo: 'clearPolicyLoadingInfo',
      setIsPolicyLoadingVisible: 'setIsPolicyLoadingVisible',
      setTxHash: 'setTxHash'
    }),
    displayClaimDialog (value) {
      this.isClaimDialogVisible = value
    },
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
      if (this.policy.premium >= this.$store.getters['user/aixBalance']) {
        this.$store.dispatch('showInsufficientBalanceDialog', true)
        return
      }

      if (this.isMetamaskLoggedIn) {
        this.displayTermsAndConditionsDialog(true)
      } else {
        this.displayLogInToEthereumClientDialog(true)
      }
    },
    async makePayment () {
      this.displayTermsAndConditionsDialog(false)
      this.setTxHash(null)
      this.displayPaymentDialog(true)
      await this.sendPolicyPayment()
    },
    claim () {
      this.$store.dispatch('insurance/claim')
    }
  },
  computed: {
    ...mapGetters(['policy', 'isPolicyLoadingVisible', 'policyLoadingInfo', 'transactionError', 'txHash']),
    isWeb3Enabled () {
      return this.$store.getters['user/isWeb3Enabled']
    },
    showWeb3NotConnected () {
      return !this.isWeb3Enabled && this.$store.getters['user/isWeb3Loaded']
    },
    deviceData () {
      try {
        return JSON.parse(this.policy.properties)
      } catch (e) {
        return null
      }
    },
    claimProperties () {
      try {
        return JSON.parse(this.policy.claimProperties)
      } catch (e) {
        return null
      }
    },
    isPolicyDraft () {
      if (this.policy.status) {
        const status = this.policy.status.toUpperCase()
        return status === 'DRAFT'
      }
    }
  },
  watch: {
    async isWeb3Enabled (newValue) {
      if (newValue) {
        await this.getPolicy({
          address: this.$route.params.address,
          type: this.$route.params.type,
          id: this.$route.params.id
        })
      }
    }
  },
  async beforeMount () {
    this.clearLoadingInfo()
    this.setIsPolicyLoadingVisible(false)
    if (this.isWeb3Enabled) {
      await this.getPolicy({
        address: this.$route.params.address,
        type: this.$route.params.type,
        id: this.$route.params.id
      })
    }
  },
  beforeRouteLeave (to, from, next) {
    this.clearLoadingInfo()
    this.setIsPolicyLoadingVisible(false)
    next()
  }
}

</script>
<style lang="scss" scoped>
  @import '~helpers/variables';
  @import '~helpers/mixins';

  @include policy-data;

  .aig-container {

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

  .checkbox-description .bold:hover {
    cursor: pointer;
  }

  .wrapper.el-button {
    width: 100%;
  }

  .claimable-message {
    margin-bottom: 20px;
    display: block;
    font-weight: 600;
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
