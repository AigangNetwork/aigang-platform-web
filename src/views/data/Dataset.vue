<template>
  <el-container class="aig-container-dataset" v-loading="loading">
    <div class="aig-blue-bck-container">
      <div class="aig-dataset-header">
        <div class="creator-info">
          <div class="creator">{{$t('data.dataset.createdBy')}} {{dataset.createdBy}}</div>
          <div class="uploaded">{{$t('data.dataset.updated')}}: {{ this.dataset.createdUtc | moment('from') }}</div>
        </div>
        <div class="dataset-title">{{dataset.title}}</div>
        <button @click="downloadDataset" class="aig-download-dataset-btn">
          <img class="file-img" src="/static/dataset/documents24px.svg" alt=""> {{$t('data.dataset.downloadDataset')}}
        </button>
      </div>
      <div class="dataset-navigation-container">
        <div class="dataset-navigation">
          <nav class="dataset-navigation-menu">
            <ul class="">
              <li v-for="bar in navigationBars" :key="bar.name">
                <router-link :to="bar.routeLink" active-class="dataset-bar-active" :class="{'disabled': bar.disabled}" exact>
                  <img class="file-img" :src="bar.imgSrc" alt=""> {{ bar.name }}
                </router-link>
              </li>
            </ul>
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
export default {
  created () {
    window.scroll(0, 0)
    this.fetchDataset()
  },
  data () {
    return {
      dataset: {},
      loading: false,
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
        routeLink: '/data/' + this.$route.params.id + '/models',
        imgSrc: '/static/models24px.svg',
        disabled: true
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
  methods: {
    fetchDataset () {
      this.loading = true
      this.axios.get('/data/' + this.$route.params.id).then(response => {
        this.loading = false
        this.dataset = response.data.data
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
      }).catch(err => {
        console.log(err)
      })
    }
  }
}

</script>
<style lang="scss" scoped>
  @import '~helpers/variables';
  @import '~helpers/mixins';

  .aig-container-dataset {
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
    .dataset-navigation {
      height: 90px;
      background-color: white;
    }

    .disabled {
      pointer-events: none;
    }
  }

  .dataset-content-container {
    display: flex;
    width: 100%;
    background-color: $dark-grey-bck-grnd;
    justify-content: center;
    .dataset-content {
      width: 100%;
      max-width: 932px;
      margin: 0px 5px 50px 5px;
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
    ul {
      list-style-type: none;
      display: flex;
      li {
        justify-content: center;
        &+li {
          margin-left: 25px;
        }
        a {
          opacity: 0.35;
          padding: 15px 10px 5px 5px;
          font-family: $font-primary;
          display: flex;
          align-items: center;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 2px;
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
      .dataset-content {
        margin-top: 100px;
      }
      .dataset-navigation-menu {
        ul {
          padding-left: 0;
          flex-direction: row;
          flex-wrap: wrap;
          flex-flow: row wrap;
          justify-content: space-around;
          li {
            margin-left: 0
          }
        }
      }
    }

    .dataset-content-container {
      .dataset-content {
        margin-top: 30px;
      }
    }
  }
</style>
