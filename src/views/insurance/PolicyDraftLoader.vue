<template>
  <div class="aig-container aig-view">
    <transition name="fade" mode="out-in">
      <Card class="product-card">
        <div slot="body" class="loader-container">

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
              <p class="info-text" key="2">{{ $t('insurance.policy.readingDeviceData') }}</p>
            </template>
          </transition-group>

          <transition-group name="slideUp" mode="out-in">
            <template v-if="policyLoadingInfo.notFound">
              <p class="info-text aig-error" key="1">{{ $t('insurance.policy.deviceIdNotFound') }}</p>
            </template>
          </transition-group>

          <transition-group name="slideUp" mode="out-in">
            <template v-if="policyLoadingInfo.serverError">
              <p class="info-text aig-error" key="1">{{ $t('insurance.policy.serverError') }}</p>
            </template>
          </transition-group>

          <transition-group name="slideUp" mode="out-in">
            <template v-if="policyLoadingInfo.policyId">
              <p class="info-text" key="1">{{ $t('insurance.policy.policyCreated') }}</p>
              <p class="info-text" key="2">{{ $t('insurance.policy.redirecting') }}</p>
            </template>
          </transition-group>

          <transition name="slideUp" mode="out-in">
            <template v-if="policyLoadingInfo.validationResultCode">
              <p class="info-text aig-error">{{ validationResult }}</p>
            </template>
          </transition>

          <div v-if="showLoader" class="timeline-wrapper">
            <div class="timeline-item">
              <div class="animated-background">
                <div class="background-masker content-top"></div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </transition>
  </div>
</template>
<script>
import Card from '@/components/Card'
import { mapGetters, mapMutations } from 'vuex'

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
      return !this.policyLoadingInfo.policyId && !this.policyLoadingInfo.validationResultCode &&
          !this.policyLoadingInfo.notFound && !this.policyLoadingInfo.serverError
    }
  },
  methods: {
    ...mapMutations({ clearLoadingInfo: 'CLEAR_POLICY_LOADING_INFO' })
  },
  beforeRouteLeave (to, from, next) {
    this.clearLoadingInfo()
    next()
  },
  async mounted () {
    await this.$store.dispatch('createNewPolicy', {
      deviceId: this.$route.params.deviceId,
      productId: this.$route.params.id
    })

    if (this.policyLoadingInfo.policyId) {
      setTimeout(() => {
        this.$router.push({
          name: 'Policy',
          params: {
            policyId: this.policyLoadingInfo.policyId
          }
        })
      }, 1000)
    }
  }
}

</script>
<style lang="scss">
  @import '~helpers/variables';
  @import '~helpers/mixins';

  @include loader;

  .aig-container {
    align-items: flex-start;
  }

  .info-text {
    text-align: center;
  }

  .loader-container {
    width: 100%;
    height: 100%;
    padding: 53px;
  }

  .loading-dots {
    position: fixed;
  }

  .loading-text {
    text-align: center;
    color: #9370DB;
    font-weight: 600;
    font-family: $font-primary;
  }

  #preloader {
    width: 100%;
    height: 100%;
  }
</style>
