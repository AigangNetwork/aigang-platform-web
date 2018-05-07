<template>
  <div class="dataset-model-header-container">
    <el-row class="dataset-title">
      <router-link :to="modelsRoute" class="back-button">
        <img src="@/../static/left.svg">
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
        <div class="aig-dataset-header-btn-container">
          <router-link v-if="isUserOwner" :to="{ name: 'edit' }" exact class="aig-dataset-header-btn fit edit">
            <img class="file-img" src="/static/dataset/edit21px.png" alt=""> {{$t('data.dataset.model.editModel')}}
          </router-link>
          <button v-if="isUserOwner" @click="dialogVisible = true" class="aig-dataset-header-btn fit delete">
            <img class="file-img" src="/static/dataset/trash24px.svg" alt=""> {{$t('data.dataset.model.deleteModel')}}
          </button>
        </div>
      </div>
      <div class="header-right-section">
        <span class="text-small">{{ $t('data.dataset.model.basePremium') }}</span>
        <span :class="{'text-big': isPremiumBig, 'text-big-medium': !isPremiumBig}">{{ model.premium }}</span>
        <span class="text-medium">{{ $t('data.dataset.model.eth') }} </span>
      </div>
    </div>

    <Dialog :title="$t('profile.warning')" :body="$t('data.dataset.model.deleteDialogBody')" :on-confirm="deleteModel" :is-visible="dialogVisible"
      :on-cancel="cancel" />
  </div>
</template>
<script>
import CreatedDate from '@/components/mixins/CreatedDate'
import Dialog from '@/components/common/Dialog'
import { mapGetters } from 'vuex'

export default {
  props: ['model'],
  mixins: [CreatedDate],
  components: { Dialog },
  data () {
    return {
      loading: false,
      modelsRoute: `/data/${this.$route.params.id}/models`,
      dialogVisible: false,
      datasetTitle: ''
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
    },
    cancel () {
      this.dialogVisible = false
    }
  },
  computed: {
    ...mapGetters(['dataset']),
    createdUtc () {
      return this.model.createdUtc
    },
    isUserOwner () {
      return this.$store.state.user.profile.id === this.model.userId
    },
    isPremiumBig () {
      return !(String(this.model.premium).length > 7)
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
      line-height: 26px;
      margin: 0;
      max-width: calc(100% - 36px);
      word-wrap: break-word;
    }
  }

  .header-title-container {
    display: flex;
    justify-content: space-between;
    background-image: linear-gradient(to bottom, #135cb2, #83b4ed);
    color: white;
    padding: 49px 55px 49px 55px;
    align-items: center;

    p,
    span,
    h1 {
      color: white;
      max-width: 100%;
      word-wrap: break-word;
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
      .text-small {
        align-self: center;
        width: 100%;
        text-align: center;
      }

      >span {
        width: 100%;
        padding: 0 20px;
        text-align: center;
      }
    }

    .header-left-section {
      max-width: 70%;
      margin-right: 20px;
    }

    .author {
      text-decoration: underline;
    }
  }

  @media screen and (min-width: 100px) and (max-width: 710px) {
    .header-title-container {
      flex-direction: column;
      padding: 35px;

      .header-right-section {
        margin: 20px auto;
      }

      .header-left-section {
        max-width: 100%;
        margin-right: 0;

        h1 {
          font-size: 24pt;
        }
      }

      .author {
        text-decoration: underline;
        margin-right: 18px;
      }
    }
  }
</style>
