<template>
  <el-container class="aig-container-dataset" v-loading="loading">
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
          <router-link v-if="isUserOwner" class="aig-dataset-header-btn" :to="editRoute" exact>
            <img class="file-img" src="/static/dataset/edit21px.png" alt=""> {{$t('data.dataset.editDataset')}}
          </router-link>
          <button v-if="isUserOwner" @click="deleteDataset" class="aig-dataset-header-btn">
            <img class="file-img" src="/static/dataset/trash24px.svg" alt=""> {{$t('data.dataset.deleteDataset')}}
          </button>
        </div>
      </div>
      <div class="dataset-navigation-container">
        <div class="dataset-navigation">
          <nav class="dataset-navigation-menu">

            <transition name="fade">
              <ul class="">
                <li v-if="!uploadingModelActive" v-for="bar in navigationBars" :key="bar.name">
                  <router-link :to="bar.routeLink" active-class="dataset-bar-active" :class="{'disabled': bar.disabled}" exact>
                    <img class="file-img" :src="bar.imgSrc" alt=""> {{ bar.name }}
                  </router-link>
                </li>
                <li v-if="uploadingModelActive">
                  <h3>{{ $t('data.dataset.model.submitModel') }}</h3>
                </li>
                <li>
                  <el-button v-if="!uploadingModelActive" class="upload-model-button" @click="$router.push({ name: 'uploadDataModel' })" type="warning">{{ $t('data.dataset.model.uploadModel') }}</el-button>
                  <el-button v-if="uploadingModelActive" class="upload-model-button" @click="$router.go(-1)" type="warning">{{ $t('general.cancel') }}</el-button>
                </li>
              </ul>
            </transition>

          </nav>

        </div>
      </div>
    </div>
    <div class="dataset-content-container">
      <div class="dataset-content">
        <router-view></router-view>
      </div>
    </div>
  </el-container>
</template>
<script>
import moment from 'moment'
export default {
  created () {
    window.scroll(0, 0)
    this.fetchDataset()
  },
  data () {
    return {
      dataset: {},
      loading: false,
      isUserOwner: false,
      editRoute: '/data/edit/' + this.$route.params.id,
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
    fetchDataset () {
      this.loading = true
      this.axios.get('/data/' + this.$route.params.id).then(response => {
        this.loading = false
        this.dataset = response.data.data
        this.$store.dispatch('setCurrentDataset', response)

        if (this.$store.state.user.profile.id === this.dataset.userId) {
          this.isUserOwner = true
        }
      })
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
    padding-left: 35px;
    max-width: 932px;
    max-height: 250px;
    margin: 150px 5px 0px 5px;
    color: #ffffff;
    .dataset-title {
      font-size: 24pt;
      font-weight: 700;
    }
    .creator-info {
      display: flex;
      margin-bottom: 5px;
      font-size: 11pt;
      .creator {
        margin-right: 15px;
      }
    }
  }

  .file-img {
    margin-right: 8px;
    margin-left: 4px;
  }

  .dataset-navigation-container {
    width: 100%;
    max-width: 932px;
    margin: 0px 5px 0px 5px;
    z-index: 1;
    .dataset-navigation {
      height: 90px;
      background-color: white;
    }

    .disabled {
      pointer-events: none;
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

  .dataset-navigation-menu {
    width: 100%;
    color: black;
    background: white;
    display: flex;
    justify-content: center;
    align-content: center;
    z-index: 1;
    ul {
      list-style-type: none;
      display: flex;
      width: 100%;
      margin: 16px 53px 16px 53px;
      padding-left: 0;
      li {
        justify-content: center;
        max-height: 48px;
        h3 {
          height: 48px;
          line-height: 48px;
          margin: 2px;
        }
        &+li {
          margin-left: 25px;
        }
        &:last-child {
          flex-grow: 1;
          text-align: right;
        }
        a {
          opacity: 0.35;
          padding: 15px 10px 5px 5px;
          font-family: $font-secondary;
          display: flex;
          align-items: center;
          font-size: 16px;
          font-weight: 500;
          letter-spacing: 0.5px;
          &:hover {
            color: rgba(black, .65);
          }
        }
      }
    }
    .dataset-bar-active {
      border-bottom: solid 2px;
      border-bottom-color: $orange;
      opacity: 1;
    }
  }

  .upload-model-button {
    margin-top: 2px;
    min-width: 137px;
  }

  @media screen and (min-width: 680px) and (max-width: 1024px) {
    .dataset-navigation-container {
      .dataset-navigation-menu {
        ul {
          padding-left: 0;
        }
      }
    }
  }

  @media screen and (min-width: 280px) and (max-width: 680px) {
    .dataset-navigation-container {
      .dataset-navigation-menu {
        padding-bottom: 10px;
        ul {
          padding-left: 0;
          flex-direction: row;
          flex-wrap: wrap;
          flex-flow: row wrap;
          justify-content: space-around;
          li {
            margin-left: 0;
            width: 40%;
            h3 {
              text-align: center;
              line-height: 24px;
              height: 24px;
              margin-top: 12px;
            }
          }
          li:last-child {
            margin-top: 30px;
            display: block;
            width: 100%;
            button {
              width: 100%;
            }
          }
        }
      }
    }

    .dataset-content-container {
      .dataset-content {
        margin-top: 42px;
      }
    }

    .aig-dataset-header {
      margin-top: 75px;
    }
  }

  @media screen and (min-width: 280px) and (max-width: 320px) {
    .aig-dataset-header {
      margin-top: 20px;
    }
  }
</style>
