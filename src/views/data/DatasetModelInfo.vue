<template>
  <div class="aig-container aig-view model-container">
    <Card class="model-card">
      <div slot="body" v-loading="loading" :element-loading-text="$t('general.loading')">
        <DatasetModelHeader :model="model" />
        <DataNavigation :show="true" :navigationBars="navigationBars" />
        <div class="dataset-content-container">
          <div class="dataset-content">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import Card from '@/components/Card'
import DatasetModelHeader from '@/components/data/DatasetModelHeader'
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
            id: this.$route.params.modelId
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
    fetchModel (id, modelId) {
      this.loading = true

      this.axios.get(`data/${id}/models/${modelId}`)
        .then(response => {
          this.loading = false
          this.model = response.data.data
        }).catch(e => {
          this.loading = false
        })
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
  }

  .model-card.aig-card {
    max-width: 932px;
    width: 100%;
    margin-top: 44px;

    .aig-card-body {
      padding: 0 !important;

    }
  }
</style>
