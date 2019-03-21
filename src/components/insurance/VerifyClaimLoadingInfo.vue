<template>
  <div class="loader-container">
    <transition-group name="slideUp" appear>

      <template v-if="showLoader">
        <div id="preloader" key="loader">
          <div id="loader"></div>
        </div>
        <p class="loading-text" key="loadingText">{{ loadingText }} </p>
      </template>

      <p class="info-text" key="deviceId">
         {{ $t('insurance.policy.deviceId') }}: <span class="bold">{{ policyLoadingInfo.deviceId }}</span>
      </p>

      <p class="info-text" if="!policyLoadingInfo.isClaimable" key="startingTaskText">
         {{ $t('insurance.policy.startingTask') }}
      </p>

    </transition-group>

    <transition-group name="slideUp" mode="out-in">
      <template v-if="policyLoadingInfo.taskId">
        <p class="info-text" key="1"> {{ $t('insurance.policy.taskId') }}:
          <span class="bold">{{ policyLoadingInfo.taskId }}</span>
        </p>
        <p class="info-text" key="2">{{ $t('insurance.policy.readingDeviceDataAndVerifyingClaim') }}</p>
      </template>
    </transition-group>

    <transition-group name="slideUp" mode="out-in">
      <template v-if="policyLoadingInfo.serverError">
        <p class="info-text aig-error" key="1">{{ $t('insurance.policy.serverError') }}</p>
      </template>
    </transition-group>

    <transition-group name="slideUp" mode="out-in">
      <template v-if="!policyLoadingInfo.isClaimable && policyLoadingInfo.isTaskFinished">
        <p class="info-text aig-error" key="1">{{ $t('insurance.policy.deviceNotClaimable') }}</p>
      </template>
    </transition-group>

    <transition-group name="slideUp" mode="out-in">
      <template v-if="policyLoadingInfo.isClaimable">

        <p class="info-text bold" key="1">
          {{ $t('insurance.policy.policyIs') }}
          <span class="bold orange">{{ $t('insurance.policy.statuses.claimable') | uppercase }}</span> </p>
        <p class="info-text" key="2">{{ $t('insurance.policy.paymentInitiated') }}</p>

        <p class="info-text" key="3">{{ $t('insurance.policy.loadingTransaction') }}</p>

        <p v-if="policyLoadingInfo.txHash" class="info-text" key="4">
          <a class="address" :href="txLink" target="_blank">
            <span class="contract-address">{{ policyLoadingInfo.txHash }}</span>
          </a>
        </p>

        <p v-if="policyLoadingInfo.txHash" class="info-text" key="5">{{ $t('insurance.policy.statusWillChange') }}</p>

        <p v-if="policyLoadingInfo.txHash" class="info-text" key="6">
          <el-button type="primary" @click.prevent.native="$router.push({ name: 'MyPolicyList' })">{{ $t('insurance.policy.backToMyPolicies') }}
          </el-button>
        </p>

      </template>
    </transition-group>

    <transition-group name="slideUp" mode="out-in">
      <template v-if="policyLoadingInfo.failed">
        <div class="step-notification info-text aig-error" key="1">
          <span>{{ $t('insurance.policy.failedToVerifyDevice.title') }}</span>
          <ul>
            <li>{{ $t('insurance.policy.failedToVerifyDevice.tip1') }}</li>
            <li>{{ $t('insurance.policy.failedToVerifyDevice.tip2') }}</li>
            <li>{{ $t('insurance.policy.failedToVerifyDevice.tip3') }}</li>
          </ul>
        </div>
      </template>
    </transition-group>

    <transition-group name="slideUp" mode="out-in">
      <template v-if="policyLoadingInfo.failed || (!policyLoadingInfo.isClaimable && policyLoadingInfo.isTaskFinished)">
        <p class="info-text" key="1">
          <el-button type="primary" @click.prevent.native="setIsPolicyLoadingVisible(false)">{{ $t('general.back') }}
          </el-button>
          <el-button type="primary" @click.prevent.native="verifyPolicyForClaim">{{ $t('general.retry') }}
          </el-button>
        </p>
      </template>
    </transition-group>

    <transition-group name="slideUp" mode="out-in">
      <template v-if="policyLoadingInfo.serverError">
        <p class="info-text" key="2">
          <el-button type="primary" @click.prevent.native="setIsPolicyLoadingVisible(false)">{{ $t('general.back') }}
          </el-button>
        </p>
      </template>
    </transition-group>

    <div v-if="showLoader" class="timeline-wrapper">
      <div class="timeline-item">
        <div class="animated-background">
          <div class="background-masker content-top"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Card from '@/components/Card'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations, mapActions } = createNamespacedHelpers('insurance')

export default {
  components: { Card },
  computed: {
    ...mapGetters(['policyLoadingInfo', 'isPolicyLoadingVisible']),
    loadingText () {
      return this.$t('general.loading').slice(0, -4)
    },
    txLink () {
      return process.env.ETHERSCAN_ADDRESS + process.env.TX_PATH + this.policyLoadingInfo.txHash
    },
    showLoader () {
      return (!this.policyLoadingInfo.isTaskFinished && !this.policyLoadingInfo.serverError && !this.policyLoadingInfo.failed) ||
      (this.policyLoadingInfo.isClaimable && !this.policyLoadingInfo.txHash)
    }
  },
  methods: {
    ...mapMutations({
      setIsPolicyLoadingVisible: 'setIsPolicyLoadingVisible'
    }),
    ...mapActions(['verifyClaim', 'getPolicy']),
    async verifyPolicyForClaim () {
      await this.verifyClaim({
        deviceId: this.policyLoadingInfo.deviceId.toUpperCase(),
        productTypeId: this.$route.params.type,
        productAddress: this.$route.params.address
      })
    }
  }
}

</script>
<style lang="scss">
  @import '~helpers/variables';
  @import '~helpers/mixins';

  @include loader;
  @include loader-container;

  .orange {
    color: $orange;
  }
</style>
