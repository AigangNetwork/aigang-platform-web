<template>
  <div class="aig-container aig-view model-container">
    <Card class="model-card">
      <div slot="body" v-loading="loading" :element-loading-text="$t('general.loading')">
        <DatasetModelHeader :model="model || {}" />
        <DataNavigation :show="true" :navigationBars="navigationBars">
          <li class="stick-to-right" key="DatasetModelVote">
            <DatasetModelVote/>
          </li>
        </DataNavigation>
        <div class="dataset-content-container">
          <div class="dataset-content">
            <transition name="slideUp">
              <router-view></router-view>
            </transition>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import Card from '@/components/Card'
import DatasetModelHeader from '@/components/data/model/DatasetModelHeader'
import DataNavigation from '@/components/navigation/DataNavigation'
import DatasetModelVote from '@/components/data/model/DatasetModelVote'
import { mapGetters } from 'vuex'
import eventHub from '@/utils/eventHub'

export default {
  components: {
    Card,
    DatasetModelHeader,
    DataNavigation,
    DatasetModelVote
  },
  data () {
    return {
      loading: false,
      navigationBars: [{
        name: this.$t('data.dataset.navigation.model'),
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
        name: this.$t('data.dataset.navigation.coefficients'),
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
        name: this.$t('data.dataset.navigation.comment'),
        routeLink: {
          name: 'modelcomment',
          params: {
            id: this.$route.params.id,
            modelId: this.$route.params.modelId
          }
        },
        imgSrc: '/static/threads24px.svg',
        disabled: false
      }
      ]
    }
  },
  computed: {
    ...mapGetters(['model'])
  },
  methods: {
    async fetchModel (datasetId, modelId) {
      this.loading = true

      try {
        await this.$store.dispatch('loadmodel', {
          datasetId,
          modelId
        })

        this.printCommentsBar(this.model.commentsCount)
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
    printCommentsBar (commentsCount) {
      const commentBar = this.navigationBars.find(bar => {
        return bar.routeLink.name === 'modelcomment'
      })
      commentBar.name = this.$t('data.dataset.navigation.comment')
      if (commentBar && commentsCount > 0) {
        commentBar.name += ` (${commentsCount})`
      }
    }
  },
  mounted () {
    this.$store.dispatch('clearmodel')
    this.fetchModel(this.$route.params.id, this.$route.params.modelId)
    eventHub.$on(eventHub.eventChangeCommentsCountForDataModel, (commentsToAdd) => {
      this.model.commentsCount += commentsToAdd
      this.printCommentsBar(this.model.commentsCount)
    })
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
