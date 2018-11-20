<template>
  <div class="aig-container aig-view aig-info" v-loading="$store.getters.loading">
    <div class="aig-info-header" v-if="isDataLoaded">
      <div class="back-button-container">
        <router-link :to="{ name: 'Portfolio' }" class="back-button">{{ $t('general.backToList')}}</router-link>
      </div>
      <div class="aig-info-header-content">
        <PoolProductHeader :info="headerInfo" />
      </div>
    </div>

    <div class="aig-info-content-container" v-if="isDataLoaded">
      <div class="aig-info-content">
        <h4 class="info-title">{{ $t('pools.contribution.description') }}</h4>
        <vue-markdown class="markup-content" :html="false" :source="currentContribution.poolDescription || $t('pools.contribution.noDescription')"></vue-markdown>

        <ContributionDeleteSection v-if="isContributionDraft" />
      </div>
    </div>
  </div>
</template>

<script>
import ConfirmContributionDialog from '@/components/pools/ConfirmContributionDialog'
import VueMarkdown from 'vue-markdown'
import PoolProductHeader from './PoolProductHeader'
import ContributionDeleteSection from '@/components/pools/ContributionDeleteSection'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters } = createNamespacedHelpers('pools')

export default {
  components: {
    ConfirmContributionDialog,
    VueMarkdown,
    PoolProductHeader,
    ContributionDeleteSection
  },
  data () {
    return {
      isDataLoaded: false,
      headerInfo: {}
    }
  },
  computed: {
    ...mapGetters(['currentContribution']),
    isContributionDraft () {
      return this.currentContribution.status.toUpperCase() === 'DRAFT'
    }
  },
  async mounted () {
    await this.$store.dispatch('pools/getContribution', this.$route.params.id)
    this.isDataLoaded = true

    this.headerInfo = {
      title: this.currentContribution.poolName
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~helpers/variables';
  @import '~helpers/mixins';

  .title-section {
    display: flex;
    flex-direction: column;
    width: 50%;
    padding: 53px 20px 53px 53px;

    .back-button {
      margin-right: 10px;
    }

    h2 {
      flex-grow: 0;
    }
  }

  .aig-button {
    margin-top: 0;
  }

  .el-row {

    &.info-section {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      width: 50%;
      padding-top: 40px;
      color: white;
      background: $purple-gradient-top-down;
    }

    div {
      padding: 23px;
      font-family: $font-secondary;
      font-weight: 600;
      font-size: 20pt;
      width: 33%;
      font-weight: 600;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
    }
  }

  .investment-item-label {
    display: block;
    text-transform: uppercase;
    font-size: 11pt;
    font-weight: 300;
  }
</style>
