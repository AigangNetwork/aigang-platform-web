<template>
  <transition-group class="items-container" name="slideUp" v-loading="$store.getters.loading || !$store.getters['user/isWeb3Loaded']">
    <el-row v-loading="$store.getters.loading">
      <el-col v-if="!$store.getters.loading">
        <!-- <div class="policy-item" v-for="(item, index) in userPolicies" :key="index">
          <router-link :to="{ name: 'Policy', params: { policyId: item.id } }">
            <PolicyItem :policy="item" />
          </router-link>
        </div>
        <div v-if="userPolicies && userPolicies.length === 0">
          <h2>{{ $t('general.noPolicies') }}</h2>
        </div> -->
      </el-col>
    </el-row>

    <el-row class="failure-message" v-if="!isWeb3Enabled && $store.getters['user/isWeb3Loaded']" key="failure-message">
      <h2>{{ $t('general.web3NotConnected') }}</h2>
    </el-row>
  </transition-group>
</template>
<script>
import PolicyItem from '@/components/insurance/PolicyItem.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('insurance')

export default {
  components: {
    PolicyItem
  },
  computed: {
    ...mapGetters(['userPolicies']),
    isWeb3Enabled () {
      return this.$store.getters['user/isWeb3Enabled']
    }
  },
  methods: {
    // ...mapActions(['loadUserPolicies'])
  },
  async mounted () {
    try {
      await this.loadUserPolicies(1)
    } catch (error) { }
  }
}

</script>
<style lang="scss" scoped>
  .items-container {
    height: 100%;
    display: inline-block;
    width: 100%;
    min-height: auto;

    .policy-item {
      margin: 10px 0px 10px 0px;
    }

    h2 {
      margin: 20px;
    }
  }

</style>
