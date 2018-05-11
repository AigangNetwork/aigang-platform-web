<template>
  <el-container class="aig-container-dataset" v-loading="loading">
    <template v-if="!datasetNotFound">
      <div class="aig-blue-bck-container">
        <div class="aig-dataset-header">
          <div class="creator-info">
            <div class="creator">{{$t('data.dataset.createdBy')}} {{dataset.createdBy}}</div>
            <div class="uploaded">{{$t('data.dataset.updated')}}: {{ updated }}</div>
          </div>
          <div class="dataset-title">{{dataset.title}}</div>
          <div class="aig-dataset-header-btn-container">
            <button v-if="!dataset.remoteFileAccessPoint" @click="downloadDataset" class="aig-dataset-header-btn">
              <img class="file-img" src="/static/dataset/documents24px.svg" alt=""> {{$t('data.dataset.downloadDataset')}}
            </button>
            <router-link v-if="isUserOwner" class="aig-dataset-header-btn fit edit" :to="editRoute" exact>
              <img class="file-img" src="/static/dataset/edit21px.png" alt=""> {{$t('data.dataset.editDataset')}}
            </router-link>
            <button v-if="isUserOwner" @click="dialogVisible = true" class="aig-dataset-header-btn fit delete">
              <img class="file-img" src="/static/dataset/trash24px.svg" alt=""> {{$t('data.dataset.deleteDataset')}}
            </button>
          </div>
        </div>
        <DataNavigation :show="!uploadingModelActive" :navigationBars="navigationBars">

          <template v-if="showUpload && $store.getters.isAuthenticated">
            <li v-if="uploadingModelActive" class="upload-model-button" key="upload-title">
              <h3>{{ $t('data.dataset.model.submitModel') }}</h3>
            </li>

            <li class="stick-to-right" key="upload-button">
              <el-button v-if="!uploadingModelActive" class="upload-model-button" @click="$router.push({name: 'uploadDataModel'})" type="warning">{{ $t('data.dataset.model.uploadModel') }}</el-button>
              <el-button v-if="uploadingModelActive" class="upload-model-button" @click="$router.push('/data/' + $route.params.id)" type="warning">{{ $t('general.cancel') }}</el-button>
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
      <Dialog :title="$t('profile.warning')" :body="$t('data.dataset.deleteDialogBody')" :on-confirm="deleteDataset" :is-visible="dialogVisible"
        :on-cancel="cancel" />
    </template>
    <template v-else>
      <Card class="aig-card centered">
        <div slot="body" v-loading="loading" :element-loading-text="$t('general.loading')">
          <h3>{{$t('data.dataset.datasetNotFound')}}</h3>
        </div>
      </Card>
    </template>
  </el-container>
</template>
<script>
import moment from 'moment'
import DataNavigation from '@/components/navigation/DataNavigation'
import Dialog from '@/components/common/Dialog'
import Card from '@/components/Card'

export default {
  components: {
    DataNavigation,
    Dialog,
    Card
  },
  async mounted () {
    window.scroll(0, 0)
    await this.fetchDataset()
    if (this.dataset.state !== 'active') {
      this.showUpload = false
    }
  },
  data () {
    return {
      dialogVisible: false,
      dataset: {},
      loading: false,
      isUserOwner: false,
      editRoute: '/data/edit/' + this.$route.params.id,
      datasetNotFound: false,
      showUpload: true,
      navigationBars: [{
        name: this.$t('data.dataset.navigation.info'),
        routeLink: {
          name: 'datasetInfo',
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
          name: 'datasetData',
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
          name: 'datasetModels',
          params: {
            id: this.$route.params.id
          }
        },
        imgSrc: '/static/models24px.svg',
        disabled: false
      },
      {
        name: this.$t('data.dataset.navigation.threads'),
        routeLink: '/data/' + this.$route.params.id + '/threads',
        imgSrc: '/static/threads24px.svg',
        disabled: true
      }
      ]
    }
  },
  computed: {
    updated () {
      return moment(this.dataset.modifiedUtc).format('YYYY-MM-DD')
    },
    uploadingModelActive () {
      return this.$route.path.includes('uploadDataModel')
    }
  },
  methods: {
    async fetchDataset () {
      this.loading = true

      try {
        await this.$store.dispatch('loadCurrentDataset', this.$route.params.id)
      } catch (error) {
        this.loading = false
        this.dataset = {}
        this.datasetNotFound = true
        return
      }

      if (this.$store.state.currentDataset) {
        this.dataset = this.$store.state.currentDataset

        if (this.$store.state.user.profile.id === this.dataset.userId) {
          this.isUserOwner = true
        }

        const modelsBar = this.navigationBars.find(bar => { return bar.routeLink.name === 'datasetModels' })
        modelsBar.name = this.$t('data.dataset.navigation.models')
        if (modelsBar && this.dataset.modelsCount > 0) {
          modelsBar.name += ` (${this.dataset.modelsCount})`
        }
      } else {
        this.datasetNotFound = true
      }

      this.loading = false
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
        this.loading = false
      })
    },
    deleteDataset () {
      this.loading = true
      this.axios.delete('data/' + this.$route.params.id).then(response => {
        this.loading = false
        this.$notify.success({
          title: this.$t('data.upload.notifications.titles.success'),
          message: this.$t('data.dataset.successDelete')
        })
        this.$router.push('/data')
      }).catch(e => {
        this.loading = false
      })
    },
    cancel () {
      this.dialogVisible = false
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
    margin: 150px 5px 50px 5px;
    color: #ffffff;

    .dataset-title {
      font-size: 24pt;
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

  @media screen and (min-width: 280px) and (max-width: 680px) {
    .aig-dataset-header {
      margin-top: 75px;
      margin-bottom: 75px;
    }

    .creator-info {
      flex-direction: column;
    }
  }

  @media screen and (min-width: 280px) and (max-width: 320px) {
    .aig-dataset-header {
      margin-top: 30px;
      margin-bottom: 40px;
    }
  }
</style>
