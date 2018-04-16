<template>
  <div class="dataset-model-header-container">
    <el-row class="dataset-title">
      <router-link :to="modelsRoute" class="back-button">
        <img src="@/../static/left.svg">
      </router-link>
      <h3>
        {{ $store.state.currentDataset.title }}
      </h3>
    </el-row>
    <div class="header-title-container">
      <div class="header-left-section">
        <p>
          {{ $t('data.dataset.model.by') }}
          <span class="author">{{ model.firstName }} {{ model.lastName }}</span>
          <span class="white-space"></span>
          {{ $t('data.dataset.model.lastUpdated')}}: {{ created }}
        </p>
        <h1>{{ model.title }}</h1>
        <div class="aig-dataset-header-btn-container">
          <router-link v-if="isUserOwner" :to="editRoute" exact class="aig-dataset-header-btn">
            <img class="file-img" src="/static/dataset/edit21px.png" alt=""> {{$t('data.dataset.editDataset')}}
          </router-link>
          <button v-if="isUserOwner" @click="deleteModel" class="aig-dataset-header-btn">
            <img class="file-img" src="/static/dataset/trash24px.svg" alt=""> {{$t('data.dataset.deleteDataset')}}
          </button>
        </div>
      </div>
      <div class="header-right-section">
        <span class="small-text">{{ $t('data.dataset.model.basePremium') }}</span>
        <span>
          <span class="text-big">{{ model.premium }}</span>
          <span class="text-medium">{{ $t('data.dataset.model.eth') }} </span>
        </span>
      </div>
    </div>

  </div>
</template>
<script>
import CreatedDate from '@/components/mixins/CreatedDate'

export default {
  props: ['model'],
  mixins: [CreatedDate],
  data () {
    return {
      loading: false,
      modelsRoute: `/data/${this.$route.params.id}/models`,
      editRoute: ''
    }
  },
  methods: {
    deleteModel () {
      this.loading = true
      this.axios.delete(`/data/${this.$route.params.id}/models/${this.$route.params.modelId}`)
        .then(response => {
          this.loading = false
          this.$notify.success({
            title: this.$t('data.upload.notifications.titles.success'),
            message: this.$t('data.dataset.model.successDelete')
          })
          this.$router.push(`/data/${this.$route.params.id}/models`)
        }).catch(e => {
          this.loading = false
        })
    }
  },
  computed: {
    createdUtc () {
      return this.model.createdUtc
    },
    isUserOwner () {
      return this.$store.state.user.profile.id === this.model.userId
    }
  }
}

</script>
<style lang="scss" scoped>
  @import '~helpers/variables';

  .back-button {
    height: 26px;
    width: 26px;
    margin-right: 10px;

    img {
      height: 22px;
    }
  }

  .back-button:hover {
    cursor: pointer;
  }

  .dataset-title {
    display: flex;
    align-items: center;
    padding: 35px;
    h3 {
      height: 28px;
      line-height: 26px;
      margin: 0;
    }
  }

  .header-title-container {
    display: flex;
    justify-content: space-between;
    background-image: linear-gradient(to bottom, #135cb2, #83b4ed);
    color: white;
    padding: 49px 75px 49px 55px;

    p,
    span,
    h1 {
      color: white;
    }

    p {
      font-size: 14px;
      line-height: 1.71;
      letter-spacing: 0.4px;
      font-family: $font-secondary;
    }

    .header-right-section {
      height: 178px;
      width: 178px;
      border-radius: 50%;
      box-shadow: 0 8px 16px 0 rgba(32, 62, 94, 0.5);
      background-color: $light-blue;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      align-content: center;
      font-family: $font-secondary;
      .small-text {
        align-self: center;
      }
    }

    .white-space {
      display: inline-block;
      width: 38px;
    }

    .author {
      text-decoration: underline;
    }
  }
</style>
