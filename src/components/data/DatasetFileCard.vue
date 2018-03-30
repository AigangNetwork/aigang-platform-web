<template>
  <div class="file-card-container">
    <div class="card-section">
      <img src="/static/dataset/csv_file_64px.svg">
      <div class="card-section-header">
        <p> {{$t('data.upload.titles.fileDetails')}} </p>
        <el-row v-if="showUploadOption">
          <el-switch v-model="isRemoteFile" :active-text="$t('data.dataset.edit.remoteAccessPoint')" :inactive-text="$t('data.dataset.edit.file')">
          </el-switch>
        </el-row>
        <transition name="slideDown">
          <el-row v-if="isRemoteFile && showUploadOption">
            <div class="profile-info-input remote-input-container">
              <el-input type="textarea" autosize v-model="remoteFileAccessPoint" @blur="debounceDispatch" :placeholder="$t('data.dataset.edit.describeRemoteAccessPoint' )"></el-input>
            </div>
          </el-row>
        </transition>
      </div>

      <transition name="fade">
        <el-upload v-if="showUploadOption && !isRemoteFile" class="profile-button" :limit="1" ref="csvFile" drag :action="''" :multiple="false"
          :auto-upload="false" accept=".csv">
          {{ $t('data.dataset.edit.uploadNew') }}
        </el-upload>
      </transition>
    </div>
    <div class="card-section">
      <div>
        <p>{{ $t('data.dataset.edit.registeredOnly') }}</p>
        <p>{{ $t('data.dataset.edit.byDefaultPublicAccess') }}</p>
      </div>
      <el-switch :value="value" @change="(value) => $emit('input', value)" :inactive-text="$t('data.dataset.edit.public')" :active-text="$t('data.dataset.edit.loggedIn')">
      </el-switch>
    </div>
  </div>
</template>
<script>
export default {
  props: ['value', 'showUploadOption'],
  data () {
    return {
      isDatasetPrivate: false,
      isRemoteFile: false,
      remoteFileAccessPoint: ''
    }
  },
  methods: {
    setCurrentDatasetIsPublic () {
      this.$store.dispatch('setCurrentDatasetIsPublic', { isPublic: this.isPublic })
    },
    debounceDispatch () {
      this.$store.dispatch('setRemoteFileAccessPoint', { remoteFileAccessPoint: this.remoteFileAccessPoint })
    }
  },
  created () {
    this.isRemoteFile = this.$store.getters.isDatasetAccessPoint
    if (this.showUploadOption) {
      console.log(this.$store.state.currentDataset.remoteFileAccessPoint)
      this.remoteFileAcccessPoint = this.$store.state.currentDataset.remoteFileAccessPoint
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~helpers/variables';

  .file-card-container {
    width: 100%;
    border-radius: 4px;
    border: solid 1px #c8d0f1;
    .card-section {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 24px;
      &:first-child {
        border-bottom: 1px solid $light-grey-border;
      }
      .card-section-header {
        flex-grow: 1;
        margin: 0 15px;
        min-height: 100px;
        p {
          margin: 0;
        }
      }
      .remote-input-container {}
      p {
        display: inline;
        line-height: 32px;
        flex-grow: 1;
        color: $purple;
        font-size: 16px;
      }
      div {
        p {
          display: block;
          margin: 0 15px;
          height: 26px;
          line-height: 26px;
          &:first-child {
            font-weight: 500;
          }
          &:last-child {
            color: $dark-gray;
            font-size: 14px;
          }
        }
      }
    }

  }

  @media screen and (min-width: 100px) and (max-width: 680px) {
    .file-card-container {
      .card-section {
        flex-direction: column;
        align-items: flex-start;
        .card-section-header {
          margin: 0;
        }
        div {
          display: block;
          width: 100%;
          p {
            margin-left: 0;
            height: 40px;
            line-height: 20px
          }
        }
        &:last-child {
          padding-bottom: 40px;
          min-height: 180px;
        }
      }
    }

  }
</style>
