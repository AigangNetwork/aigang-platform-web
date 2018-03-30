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
          <el-row v-if="isRemoteFile">
            <div class="profile-info-input remote-input-container">
              <el-input type="textarea" autosize v-model="url" :placeholder="$t('data.dataset.edit.describeRemoteAccessPoint' )"></el-input>
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
      <el-switch v-model="isPublic" @change="setCurrentDatasetIsPublic" :inactive-text="$t('data.dataset.edit.public')" :active-text="$t('data.dataset.edit.loggedIn')">
      </el-switch>
    </div>
  </div>
</template>
<script>
export default {
  props: ['showUploadOption', 'isFileAccessRemote'],
  data () {
    return {
      isDatasetPrivate: false,
      isPublic: false,
      isRemoteFile: false,
      url: ''
    }
  },
  methods: {
    setCurrentDatasetIsPublic () {
      this.$store.dispatch('setCurrentDatasetIsPublic', { isPublic: this.isPublic })
    }
  },
  created () {
    this.isPublic = this.$store.state.currentDataset.isPublic
    this.isRemoteFile = this.$store.getters.isDatasetAccessPoint
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
</style>
