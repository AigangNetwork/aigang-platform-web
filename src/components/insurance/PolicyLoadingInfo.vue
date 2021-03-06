<template>
  <div class="loader-container">
    <transition-group name="slideUp" appear>
      <template v-if="showLoader">
        <div id="preloader" key="loader">
          <div id="loader"></div>
        </div>
        <p class="loading-text" key="loadingText">{{ loadingText }} </p>
      </template>
      <p class="info-text" key="deviceId"> {{ $t('insurance.policy.deviceId') }}:
        <span class="bold">{{ policyLoadingInfo.deviceId }}</span>
      </p>
      <p class="info-text" key="startingTaskText"> {{ $t('insurance.policy.startingTask') }}</p>
    </transition-group>

    <transition-group name="slideUp" mode="out-in">
      <template v-if="policyLoadingInfo.taskId">
        <p class="info-text" key="1"> {{ $t('insurance.policy.taskId') }}:
          <span class="bold">{{ policyLoadingInfo.taskId }}</span>
        </p>
        <p class="info-text" key="2">{{ $t('insurance.policy.readingDeviceDataAndCalculatingInsurancePrice') }}</p>
      </template>
    </transition-group>

    <transition-group name="slideUp" mode="out-in">
      <template v-if="policyLoadingInfo.notFound">
        <p class="info-text aig-error" key="1">{{ $t('insurance.policy.deviceIdNotFound') }}</p>
        <p class="info-text" key="2">
          <el-button type="primary" @click.prevent.native="setIsPolicyLoadingVisible(false)">{{ $t('general.back') }}
          </el-button>
        </p>
      </template>
    </transition-group>

    <transition-group name="slideUp" mode="out-in">
      <template v-if="policyLoadingInfo.validationReasons">
        <p class="info-text aig-error" :key="index" v-for="(val, index) in policyLoadingInfo.validationReasons">
          {{ $t(val) }}
        </p>
        <p class="info-text" key="200">
          <el-button type="primary" @click.prevent.native="setIsPolicyLoadingVisible(false)">{{ $t('general.back') }}
          </el-button>
        </p>
      </template>
    </transition-group>

    <transition-group name="slideUp" mode="out-in">
      <template v-if="policyLoadingInfo.serverError">
        <p class="info-text aig-error" key="1">{{ $t('insurance.policy.serverError') }}</p>
        <p class="info-text" key="2">
          <el-button type="primary" @click.prevent.native="setIsPolicyLoadingVisible(false)">{{ $t('general.back') }}
          </el-button>
        </p>
      </template>
    </transition-group>

    <transition-group name="slideUp" mode="out-in">
      <template v-if="policyLoadingInfo.serverNotAvailable">
        <p class="info-text aig-error" key="1">{{ $t('insurance.policy.serverNotAvailable') }}</p>
        <p class="info-text" key="2">
          <el-button type="primary" @click.prevent.native="setIsPolicyLoadingVisible(false)">{{ $t('general.back') }}
          </el-button>
        </p>
      </template>
    </transition-group>

    <transition-group name="slideUp" mode="out-in">
      <template v-if="policyLoadingInfo.policyId">
        <p class="info-text" key="1">{{ $t('insurance.policy.policyCreated') }}</p>
        <p class="info-text" key="2">{{ $t('insurance.policy.redirecting') }}</p>
      </template>
    </transition-group>

    <transition-group name="slideUp" mode="out-in">
      <template v-if="policyLoadingInfo.validationResultCode">
        <p class="info-text aig-error" key="1">{{ validationResult }}</p>
        <p class="info-text" key="2">
          <el-button type="primary" @click.prevent.native="setIsPolicyLoadingVisible(false)">{{ $t('general.back') }}
          </el-button>
          <el-button type="primary" @click.prevent.native="createPolicy">{{ $t('general.retry') }}
          </el-button>
        </p>
      </template>
    </transition-group>

    <transition-group name="slideUp" mode="out-in">
      <template v-if="policyLoadingInfo.failed">
        <p class="info-text" key="1">{{ $t('insurance.policy.readingDeviceDataTimeout') }}</p>
        <p class="info-text" key="2">
          <el-button type="primary" @click.prevent.native="setIsPolicyLoadingVisible(false)">{{ $t('general.back') }}
          </el-button>
          <el-button type="primary" @click.prevent.native="createPolicy">{{ $t('general.retry') }}
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
    ...mapGetters(['policyLoadingInfo']),
    loadingText () {
      return this.$t('general.loading').slice(0, -4)
    },
    validationResult () {
      switch (this.policyLoadingInfo.validationResultCode) {
        case 'DC':
          return this.$t('insurance.policy.validationResult.BatteryDesignCapacity')
        case 'CL':
          return this.$t('insurance.policy.validationResult.BatteryChargeLevel')
        case 'DA':
          return this.$t('insurance.policy.validationResult.DeviceAgeInMonths')
        case 'R':
          return this.$t('insurance.policy.validationResult.Region')
        case 'DB':
          return this.$t('insurance.policy.validationResult.DeviceBrand')
        case 'WL':
          return this.$t('insurance.policy.validationResult.BatteryWearLevel')
        default:
          return null
      }
    },
    showLoader () {
      return (
        !this.policyLoadingInfo.policyId &&
        !this.policyLoadingInfo.validationResultCode &&
        !this.policyLoadingInfo.notFound &&
        !this.policyLoadingInfo.serverError &&
        !this.policyLoadingInfo.serverNotAvailable &&
        !this.policyLoadingInfo.failed &&
        (!this.policyLoadingInfo.validationReasons || this.policyLoadingInfo.validationReasons.length === 0)
      )
    }
  },
  methods: {
    ...mapMutations({
      setIsPolicyLoadingVisible: 'setIsPolicyLoadingVisible'
    }),
    ...mapActions(['createNewPolicy']),
    async createPolicy () {
      const productTypeId = this.$route.params.type
      const productAddress = this.$route.params.address

      await this.createNewPolicy({
        deviceId: this.policyLoadingInfo.deviceId,
        productTypeId,
        productAddress
      })

      if (this.policyLoadingInfo.policy) {
        setTimeout(() => {
          this.setIsPolicyLoadingVisible(false)
          this.$router.push({ name: 'PayPolicy' })
        }, 1000)
      }
    }
  }
}
</script>

<style lang="scss">
  @import '~helpers/variables';
  @import '~helpers/mixins';

  @include loader;
  @include loader-container;
</style>
