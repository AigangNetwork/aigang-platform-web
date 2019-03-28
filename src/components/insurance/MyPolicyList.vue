<template>
  <transition-group class="items-container" name="slideUp" v-loading="$store.getters.loading || !$store.getters['user/isWeb3Loaded']">
    <el-row v-loading="$store.getters.loading" v-if="showPolicies" key='policy-items-container'>
      <el-col v-if="!$store.getters.loading">
        <transition-group name="slideUp">
        <div class="policy-item" v-for="(item, index) in itemsList" :key="index">
              <PolicyItem :policy="item" />
          </div>
        </transition-group>
        <el-col v-if="isWeb3Enabled">
          <transition name="slideUp">
            <Pagination v-if="userPolicies.totalPages > 1" :callback="loadPage" :total-page-count="userPolicies.totalPages"
              :current-page="page" />
          </transition>
        </el-col>
      </el-col>
    </el-row>

    <el-row class="failure-message" v-if="showWeb3NotConnected" key="failure-message">
      <h2>{{ $t('general.web3NotConnected') }}</h2>
    </el-row>

    <el-row class="failure-message" key="no-pools-message" v-else-if="!showPolicies && isDataLoaded ">
      <h2>{{ $t('general.noPolicies') }}</h2>
    </el-row>
  </transition-group>
</template>

<script>
import PolicyItem from '@/components/insurance/PolicyItem.vue'
import Pagination from '@/components/Pagination'
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('insurance')

export default {
  components: {
    PolicyItem,
    Pagination
  },
  data () {
    return {
      isDataLoaded: false,
      page: 1
    }
  },
  computed: {
    ...mapGetters(['userPolicies']),
    isWeb3Enabled () {
      return this.$store.getters['user/isWeb3Enabled']
    },
    showWeb3NotConnected () {
      return !this.isWeb3Enabled && this.$store.getters['user/isWeb3Loaded']
    },
    showPolicies () {
      return this.isWeb3Enabled &&
        (!this.$store.getters.loading || this.$store.getters['user/isWeb3Loaded']) &&
        this.userPolicies &&
        (this.userPolicies.items && this.userPolicies.items.length !== 0)
    },
    itemsList () {
      if (this.userPolicies.items.length < this.userPolicies.totalItems) {
        const placeholders = new Array(this.userPolicies.totalItems - this.userPolicies.items.length)
        return this.userPolicies.items.concat(placeholders)
      } else {
        return this.userPolicies.items
      }
    }
  },
  methods: {
    ...mapActions(['loadUserPolicies']),
    async loadPage (page) {
      this.isDataLoaded = false
      this.page = page
      await this.loadUserPolicies(page)
      this.isDataLoaded = true
    }
  },
  watch: {
    async isWeb3Enabled (newValue) {
      if (newValue) {
        await this.loadUserPolicies(1)
        this.isDataLoaded = true
      }
    }
  },
  async beforeMount () {
    if (this.isWeb3Enabled) {
      await this.loadUserPolicies(1)
      this.isDataLoaded = true
    }
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
