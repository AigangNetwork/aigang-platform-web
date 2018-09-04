<template>
  <el-container class="aig-container-dataset" v-loading="loading">
    <div class="aig-blue-bck-container">
      <div class="aig-dataset-header">
        <div>
          <div class="creator-info">
            <div class="creator">{{$t('data.dataset.createdBy')}} {{ dataset.createdBy }}</div>
            <div class="uploaded">{{$t('data.dataset.updated')}}: {{ updated }}</div>
          </div>
          <div class="dataset-title">{{dataset.title}}</div>
          <div class="dataset-state" v-if="dataset.state === 'created'">Status: {{ $t('data.card.notApproved') }}</div>
          <div class="dataset-state" v-if="dataset.state === 'closed'">Status: {{ $t('data.card.closed') }}</div>
          <div class="aig-dataset-header-btn-container">
            <button v-if="!dataset.remoteFileAccessPoint" @click="downloadDataset" class="aig-dataset-header-btn">
              <i class="el-icon-document button-icon"></i> {{$t('data.dataset.downloadDataset')}}
            </button>
            <router-link v-if="isUserOwner" class="aig-dataset-header-btn fit edit" :to="editRoute" exact>
              <i class="el-icon-edit button-icon"></i> {{$t('data.dataset.editDataset')}}
            </router-link>
          </div>
        </div>
        <div class="dataset-tags-container">
          <DatasetTag v-for="(tag, index) in dataset.tags" v-bind:key="index">
            #{{tag}}
          </DatasetTag>
        </div>
      </div>
      <DataNavigation :show="!uploadingModelActive" :navigationBars="navigationBars">

        <template v-if="showUpload">
          <li v-if="uploadingModelActive" class="upload-model-button" key="upload-title">
            <h3>{{ $t('data.dataset.model.submitModel') }}</h3>
          </li>

          <li class="stick-to-right" key="upload-button">
            <el-tooltip v-if="!uploadingModelActive" :disabled="$store.getters['user/isAuthenticated']" :content="$t('data.dataset.uploadModelDisabled')">
              <span class="wrapper el-button">
                <el-button :disabled="!$store.getters['user/isAuthenticated']" class="upload-model-button" @click="$router.push({name: 'UploadDataModel'})"
                  type="warning">{{ $t('data.dataset.model.uploadModel') }}</el-button>
              </span>
            </el-tooltip>
            <el-button :disabled="!$store.getters['user/isAuthenticated']" v-if="uploadingModelActive" class="upload-model-button" @click="$router.push('/data/' + $route.params.id)"
              type="warning">{{ $t('general.cancel') }}</el-button>
          </li>
        </template>
        <template v-else>
          <li class="stick-to-right" key="space">
          </li>
        </template>
      </DataNavigation>

    </div>
    <div class="dataset-content-container">
      <div class="dataset-content">
        <transition name="slideUp">
          <router-view></router-view>
        </transition>
      </div>
    </div>

  </el-container>
</template>
<script>
import moment from 'moment'
import DataNavigation from '@/components/navigation/DataNavigation'
import Card from '@/components/Card'
import eventHub from '@/utils/eventHub'
import DatasetTag from '@/components/data/dataset/DatsetTag'
import {
  mapGetters
} from 'vuex'

export default {
  components: {
    DataNavigation,
    Card,
    DatasetTag
  },
  async mounted () {
    window.scroll(0, 0)
    await this.fetchDataset()
    if (this.dataset.state !== 'active') {
      this.showUpload = false
    }
    eventHub.$on(eventHub.eventChangeCommentsCountForDataset, (commentsToAdd) => {
      this.dataset.commentsCount += commentsToAdd
      this.setComments(this.dataset.commentsCount)
    })
  },
  data () {
    return {
      loading: false,
      isUserOwner: false,
      editRoute: '/data/' + this.$route.params.id + '/edit',
      showUpload: true,
      navigationBars: [{
        name: this.$t('data.dataset.navigation.info'),
        routeLink: {
          name: 'DatasetInfo',
          params: {
            id: this.$route.params.id
          }
        },
        imgSrc: '/static/dataset/info24px.svg',
        disabled: false
      },
      {
        name: this.$t('data.dataset.navigation.data'),
        routeLink: {
          name: 'DatasetData',
          params: {
            id: this.$route.params.id
          }
        },
        imgSrc: '/static/dataset/data24px.svg',
        disabled: false
      },
      {
        name: this.$t('data.dataset.navigation.models'),
        routeLink: {
          name: 'DatasetModels',
          params: {
            id: this.$route.params.id
          }
        },
        imgSrc: '/static/models24px.svg',
        disabled: false
      },
      {
        name: this.$t('data.dataset.navigation.comment'),
        routeLink: {
          name: 'DatasetComment',
          params: {
            id: this.$route.params.id
          }
        },
        imgSrc: '/static/threads24px.svg',
        disabled: false
      }
      ]
    }
  },
  computed: {
    ...mapGetters(['dataset']),
    updated () {
      return moment(this.dataset.modifiedUtc).format('YYYY-MM-DD')
    },
    uploadingModelActive () {
      return this.$route.path.includes('uploadDataModel')
    }
  },
  watch: {
    dataset (newCount, oldCount) {
      const modelsBar = this.navigationBars.find(bar => {
        return bar.routeLink.name === 'DatasetModels'
      })

      modelsBar.name = this.$t('data.dataset.navigation.models')

      if (modelsBar && this.dataset.modelsCount > 0) {
        modelsBar.name += ` (${this.dataset.modelsCount})`
      }
    }
  },
  methods: {
    async fetchDataset () {
      this.loading = true

      try {
        await this.$store.dispatch('loadDataset', this.$route.params.id)
      } catch (error) {
        this.loading = false
        return
      }

      if (this.dataset && this.dataset.id) {
        if (this.$store.state.user.profile &&
            this.$store.state.user.profile.id === this.dataset.userId) {
          this.isUserOwner = true
        }

        this.setComments(this.dataset.commentsCount)
      } else {
        this.$router.push({
          name: 'NotFound',
          params: { '0': 'notfound' }
        })
      }

      this.loading = false
    },
    setComments (commentsCount) {
      const commentBar = this.navigationBars.find(bar => {
        return bar.routeLink.name === 'DatasetComment'
      })

      commentBar.name = this.$t('data.dataset.navigation.comment')
      if (commentBar && commentsCount > 0) {
        commentBar.name += ` (${commentsCount})`
      }
    },
    downloadDataset () {
      this.loading = true
      this.axios.get('data/' + this.$route.params.id + '/file', {
        responseType: 'blob'
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', this.$route.params.id + '.csv')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        this.loading = false
      })
    }
  }
}

</script>
<style lang="scss" scoped>
  @import '~helpers/variables';
  @import '~helpers/mixins';

  .aig-container-dataset {
    overflow: hidden;
    max-width: 1440px;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: block;
  }

  .aig-dataset-header {
    width: 100%;
    padding: 0 35px;
    max-width: 932px;
    min-height: 250px;
    margin: 150px 5px 10px 5px;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .dataset-tags-container {
      display: flex;
    }
    .dataset-title {
      font-size: 27pt;
      font-weight: 700;
      max-width: 100%;
      word-wrap: break-word;
    }

    .creator-info {
      display: flex;
      margin-bottom: 25px;
      font-size: 11pt;

      .creator {
        margin-right: 15px;
      }
    }

    .uploaded,
    .creator {
      font-family: $font-secondary;
      font-weight: 300;
      font-size: 14px;
      line-height: 1.71;
      letter-spacing: 0.4px;
      max-width: 100%;
      word-wrap: break-word;
    }
  }

  .dataset-content-container {
    display: block;
    height: 100%;
    width: 100%;
    background-color: $dark-grey-bck-grnd;
    justify-content: center;
    .dataset-content {
      width: 100%;
      max-width: 932px;
      margin: 0 auto;
      margin-bottom: 40px;
      background-color: white;
      border: 1px solid $light-grey-border;
    }
  }

  .upload-model-button {
    margin-top: 2px;
    min-width: 137px;
  }

  .dataset-navigation li {
    h3 {
      margin: 0;
      margin-top: 0;
      height: 48px;
      line-height: 48px;
    }
  }

  .dataset-state {
    font-size: 18px;
    margin: 20px 0 20px 0;
  }

  @media screen and (min-width: 280px) and (max-width: 680px) {
    .aig-dataset-header {
      margin-top: 75px;
      margin-bottom: 25px;
    }

    .creator-info {
      flex-direction: column;
    }

    .dataset-tags-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 10px;
    }
  }

  @media screen and (min-width: 280px) and (max-width: 320px) {
    .aig-dataset-header {
      margin-top: 30px;
      margin-bottom: 20px;
    }
  }
</style>
