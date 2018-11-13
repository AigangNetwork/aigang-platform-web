<template>
  <div class="aig-card-container portfolio" v-loading="$store.getters.loading">
    <PortfolioSummarySection />
    <PoolsList :contributions="userContributions"/>
  </div>
</template>

<script>
import PortfolioSummarySection from '@/components/pools/PortfolioSummarySection'
import PoolsList from '@/components/pools/PoolsList'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('pools')

export default {
  components: {
    PortfolioSummarySection,
    PoolsList
  },
  computed: {
    ...mapGetters(['userContributions'])
  },
  data () {
    return {
      isDataLoaded: false
    }
  },
  async beforeMount () {
    if (!this.$store.getters['user/isAuthenticated']) {
      this.$router.push({ name: 'PoolsProducts' })
    }

    if (!this.isDataLoaded) {
      await this.loadPage(1)
      this.isDataLoaded = true
    }
  },
  methods: {
    async loadPage (page) {
      this.page = page
      await this.$store.dispatch('pools/getUserContributions', this.page)
    }
  }
}
</script>

<style lang="scss">
  @import '~helpers/variables';

  .portfolio {
    flex-direction: column;
    display: block;

    .aig-card-body {
      padding: 0 !important;
      font-family: $font-secondary;
    }
  }

  .aig-card.portfolio-card {
    &:last-child {
      margin-top: 0;

      .aig-card-body {
        margin-top: 0 !important;
      }
    }

    &:first-child {
      margin-top: 20px;

      .aig-card-body {
        margin-top: 0 !important;
      }
    }
  }
</style>
