<template>
  <div class="aig-container aig-view model-container">
    <Card class="model-card">
      <div slot="body" v-loading="loading" :element-loading-text="$t('general.loading')">
        <template v-if="!modelNotFound">
          <DatasetModelHeader :model="model" />
          <DataNavigation :show="true" :navigationBars="navigationBars" />
          <div class="dataset-content-container">
            <div class="dataset-content">
              <transition name="slideUp">
                <router-view></router-view>
              </transition>
            </div>
          </div>
        </template>
        <template v-else>
          <h3 class="not-found-message">{{$t('data.dataset.model.modelNotFound')}}</h3>
        </template>
      </div>
    </Card>
  </div>
</template>
<script>
import Card from '@/components/Card'
import DatasetModelHeader from '@/components/data/model/DatasetModelHeader'
import DataNavigation from '@/components/navigation/DataNavigation'

export default {
  components: {
    Card,
    DatasetModelHeader,
    DataNavigation
  },
  data () {
    return {
      loading: false,
      model: {},
      modelNotFound: false,
      navigationBars: [{
        name: this.$t('data.dataset.navigation.info'),
        routeLink: {
          name: 'modelInfo',
          params: {
            id: this.$route.params.id,
            modelId: this.$route.params.modelId
          }
        },
        imgSrc: '/static/dataset/info24px.svg',
        disabled: false
      },
      {
        name: this.$t('data.dataset.navigation.model'),
        routeLink: {
          name: 'modelTables',
          params: {
            id: this.$route.params.id,
            modelId: this.$route.params.modelId
          }
        },
        imgSrc: '/static/models24px.svg',
        disabled: false
      },
      {
        name: this.$t('data.dataset.navigation.threads'),
        routeLink: '/data/' + this.$route.params.modelId + '/threads',
        imgSrc: '/static/threads24px.svg',
        disabled: true
      }
      ]
    }
  },
  methods: {
    async fetchModel (id, modelId) {
      this.loading = true

      try {
        await this.$store.dispatch('loadCurrentModel', { id, modelId })
        this.model = this.$store.state.currentModel
        if (!this.model) {
          this.modelNotFound = true
        }
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    }
  },
  created () {
    this.fetchModel(this.$route.params.id, this.$route.params.modelId)
  }
}

</script>
<style lang="scss">
  @import '~helpers/variables';
  .aig-container.model-container {
    align-items: flex-start;
  }

  .model-container .dataset-content {
    border-top: 1px solid $light-grey-border;
    min-height: 150px
  }

  .model-card.aig-card {
    margin-top: 44px;

    .aig-card-body {
      padding: 0 !important;
    }
  }

  .not-found-message {
    padding: 40px;
  }
</style>
