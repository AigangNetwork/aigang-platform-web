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

              <el-tooltip v-if="policy.status && policy.status.toUpperCase() === 'DRAFT'" :disabled="$store.getters['user/isWeb3Enabled']" effect="dark"
                :content="$t('general.userNotLoggedIn')" placement="top">
              <el-tooltip :disabled="isBalanceEnough" effect="dark" :content="$t('general.insufficientBalance')" placement="top">
                <span class="wrapper el-button">
                  <el-button :disabled="!$store.getters['user/isWeb3Enabled'] || !isBalanceEnough" class="aig-button" type="primary" @click.prevent.native="insure">
                    {{ $t('insurance.policy.pay') }}
                  </el-button>
                </span>
              </el-tooltip>
              </el-tooltip>

              <el-col v-else-if="policy.status && policy.status.toUpperCase() === 'PAID'">
                <el-button class="aig-button" type="primary" @click.prevent.native="verifyClaim">
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

            <PolicyDeleteSection v-if="isPolicyDraft" />
          </div>

          <VerifyClaimLoadingInfo v-else key="2" />
        </transition-group>
      </div>
    </Card>

    <TermsAndConditionsDialog
      :termsAndConditions="policy.termsAndConditions"
      :isVisible="isTermsAndConditionsDialogVisible"
      :displayDialog="displayTermsAndConditionsDialog"
      @agreed="makePayment" />

    <LogInToEthereumClientDialog
      :isVisible="isDisplayLogInToEthereumClientDialogVisible"
      :displayDialog="displayLogInToEthereumClientDialog" />

    <PaymentConfirmationDialog :isVisible="isPaymentDialogVisible && !transactionError" :displayDialog="displayPaymentDialog" />
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
import VerifyClaimLoadingInfo from '@/components/insurance/VerifyClaimLoadingInfo'

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
    PolicyDeleteSection,
    VerifyClaimLoadingInfo
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
    ...mapMutations({
      clearLoadingInfo: 'clearPolicyLoadingInfo',
      setIsPolicyLoadingVisible: 'setIsPolicyLoadingVisible',
      setTxHash: 'setTxHash'
    }),
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
      this.setTxHash(null)
      this.displayPaymentDialog(true)
      await this.sendPolicyPayment()
    },
    async verifyClaim () {
      await this.$store.dispatch('insurance/verifyClaim')

      if (this.policyLoadingInfo.isClaimable) {
        setTimeout(() => {
          this.getPolicy(this.$route.params.policyId)
          this.setIsPolicyLoadingVisible(false)
          this.clearLoadingInfo()
        }, 3000)
      }
    },
    claim () {
      this.$store.dispatch('insurance/claim')
    }
  },
  computed: {
    ...mapGetters(['policy', 'isPolicyLoadingVisible', 'policyLoadingInfo', 'transactionError']),
    isMetamaskLoggedIn () {
      return $store.getters['user/isWeb3Enabled']
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
    },
    isBalanceEnough () {
      return this.policy.premium <= this.$store.getters['user/aixBalance']
    }
  },
  async mounted () {
    await this.getPolicy(this.$route.params.policyId)
  },
  async beforeMount () {
    this.clearLoadingInfo()
    this.setIsPolicyLoadingVisible(false)
  },
  beforeRouteLeave (to, from, next) {
    this.clearLoadingInfo()
    this.setIsPolicyLoadingVisible(false)
    next()
  }
}

</script>
<style lang="scss">
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
