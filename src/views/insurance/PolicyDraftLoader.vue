<template>
  <div class="aig-container aig-view">
    <transition name="fade" mode="out-in">
      <Card class="product-card">
        <div slot="body" class="loader-container">
          <div id="preloader">
            <div id="loader"></div>
          </div>
          <p class="loading-text">{{ loadingText }} </p>
          <p class="info-text"> {{ $t('insurance.policy.deviceId') }}:
            <span class="bold">{{ policy.deviceId }}</span>
          </p>
          <p class="info-text"> {{ $t('insurance.policy.startingTask') }}</p>
          <transition-group name="slideUp" mode="out-in">
            <template v-if="policy.taskId">
              <p class="info-text" key="1"> {{ $t('insurance.policy.taskId') }}:
                <span class="bold">{{ policy.taskId }}</span>
              </p>
              <p class="info-text" key="2">{{ $t('insurance.policy.readingDeviceData') }}</p>
            </template>
          </transition-group>
          <transition-group name="slideUp" mode="out-in">
            <template v-if="policy.policyId">
              <p class="info-text" key="1">{{ $t('insurance.policy.policyCreated') }}</p>
              <p class="info-text" key="2">{{ $t('insurance.policy.redirecting') }}</p>
            </template>
          </transition-group>
          <div v-if="!policy.policyId" class="timeline-wrapper">
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
import { mapGetters } from 'vuex'

export default {
  components: { Card },
  computed: {
    ...mapGetters(['policy']),
    loadingText () {
      return this.$t('general.loading').slice(0, -4)
    }
  },
  async mounted () {
    await this.$store.dispatch('createNewPolicy', this.$route.params.deviceId)
    // Give user time to see that everything is ok, redirecting
    setTimeout(() => {
      this.$router.push({
        name: 'Policy',
        params: {
          policyId: this.policy.policyId
        }
      })
    }, 1000)
  }
}

</script>
<style lang="scss">
  @import '~helpers/variables';

  .aig-container {
    align-items: flex-start;
  }

  .aig-card.product-card .aig-card-body {
    margin-top: 43px !important;
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

  #loader {
    display: block;
    position: relative;
    left: 50%;
    top: 50%;
    width: 150px;
    height: 150px;
    margin: 0 0 0 -75px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #9370DB;
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
  }

  #loader:before {
    content: "";
    position: absolute;
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #BA55D3;
    -webkit-animation: spin 3s linear infinite;
    animation: spin 3s linear infinite;
  }

  #loader:after {
    content: "";
    position: absolute;
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #FF00FF;
    -webkit-animation: spin 1.5s linear infinite;
    animation: spin 1.5s linear infinite;
  }

  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  @keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
      -ms-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      -ms-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

  .timeline-item {
    background: #fff;
    margin: 0 auto;
    width: 100%;
    height: 20px;
  }

  @keyframes placeHolderShimmer {
    0% {
      background-position: -468px 0
    }
    100% {
      background-position: 468px 0
    }
  }

  .animated-background {
    border-radius: 3px;
    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    background: #f6f7f8;
    background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
    background-size: 800px 120px;
    height: 20px;
    width: 250px;
    margin: 0 auto;
    position: relative;
  }
</style>
