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
            </el-row>

            <el-row class="footer">
              <el-col>
                <el-button class="aig-button" type="primary" @click.prevent.native="insure">
                  {{ $t('insurance.policy.pay') }}
                </el-button>
              </el-col>
            </el-row>
          </div>

        </transition-group>
      </div>
    </Card>

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
import PolicyInfo from '@/components/insurance/policy/PolicyInfo'
import DeviceInfo from '@/components/insurance/policy/DeviceInfo'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('insurance')

export default {
  components: {
    Card,
    PaymentConfirmationDialog,
    PolicyInfo,
    DeviceInfo
  },
  data () {
    return {
      isPaymentDialogVisible: false,
      policyListRoute: '/insurance/policy/mypolicies'
    }
  },
  methods: {
    ...mapMutations({
      setTxHash: 'setTxHash',
      clearLoadingInfo: 'clearPolicyLoadingInfo'
    }),
    displayPaymentDialog (value) {
      this.isPaymentDialogVisible = value
    },
    async insure () {
      if (this.policyLoadingInfo.premium >= this.$store.getters['user/aixBalance']) {
        await this.$store.dispatch('showInsufficientBalanceDialog', true)
        return
      }

      this.setTxHash(null)
      this.displayPaymentDialog(true)
      await this.$store.dispatch('insurance/sendPolicyPayment', this.policyLoadingInfo)
    }
  },
  computed: {
    ...mapGetters(['isPolicyLoadingVisible', 'policyLoadingInfo', 'transactionError', 'txHash']),
    isWeb3Enabled () {
      return this.$store.getters['user/isWeb3Enabled']
    },
    showWeb3NotConnected () {
      return !this.isWeb3Enabled && this.$store.getters['user/isWeb3Loaded']
    },
    policy () {
      try {
        let policy = this.policyLoadingInfo.policy
        policy.address = policy.productAddress

        return policy
      } catch (e) {
        return null
      }
    },
    deviceData () {
      try {
        return JSON.parse(this.policyLoadingInfo.policy.properties)
      } catch (e) {
        return null
      }
    }
  },
  beforeMount () {
    if (!this.policyLoadingInfo.policy) {
      this.$router.push({ name: 'InsuranceProducts' })
    }
  },
  beforeRouteLeave (to, from, next) {
    this.clearLoadingInfo()
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
