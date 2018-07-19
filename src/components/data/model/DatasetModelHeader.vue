<template>
  <div class="dataset-model-header-container">
    <el-row class="dataset-title">
      <router-link :to="modelsRoute" class="back-button">
        <i class="back-icon el-icon-arrow-left"></i>
      </router-link>
      <h3>
        {{ dataset.title }}
      </h3>
    </el-row>
    <div class="header-title-container">
      <div class="header-left-section">
        <p>
          <span>{{ $t('data.dataset.model.by') }} </span>
          <span class="author">{{ model.userName }}</span>
          <span class="no-wrap">{{ $t('data.dataset.model.lastUpdated')}}: {{ created }}</span>
        </p>
        <h1>{{ model.title }}</h1>
        <div class="aig-dataset-header-btn-container" v-if="isDatasetActive">
          <router-link v-if="isUserOwner" :to="{ name: 'edit' }" exact class="aig-dataset-header-btn fit edit">
            <i class="el-icon-edit button-icon"></i> {{$t('data.dataset.model.editModel')}}
          </router-link>
        </div>
      </div>
      <div class="header-right-section">
        <span class="text-small">{{ $t('data.dataset.model.basePremium') }}</span>
        <span :class="{'text-big': isPremiumBig, 'text-big-medium': !isPremiumBig}">{{ model.premium }}</span>
        <span class="text-medium">{{ $t('data.dataset.model.aix') }} </span>
      </div>
    </div>
  </div>
</template>
<script>
import CreatedDate from '@/components/mixins/CreatedDate'
import {
  mapGetters
} from 'vuex'

export default {
  props: ['model'],
  mixins: [CreatedDate],
  data () {
    return {
      loading: false,
      modelsRoute: `/data/${this.$route.params.id}/models`,
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters(['dataset']),
    createdUtc () {
      return this.model.createdUtc
    },
    isUserOwner () {
      if (this.$store.state.user.profile) {
        return this.$store.state.user.profile.id === this.model.userId
      }
      return false
    },
    isPremiumBig () {
      return !(String(this.model.premium).length > 7)
    },
    isDatasetActive () {
      return this.dataset.state === 'active'
    }
  },
  async created () {
    if (!this.dataset) {
      await this.$store.dispatch('loadCurrentDataset', this.$route.params.id)
    }
  }
}

</script>
<style lang="scss" scoped>
  @import '~helpers/variables';
  @import '~helpers/mixins';
  @include aig-header;
</style>
