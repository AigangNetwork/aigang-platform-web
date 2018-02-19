<template>
  <button class="aig__data aig__data--creatable" @click="modalUpload = true" v-if="creatable">
    <span class="title">{{ $t('actions.upload_new_data') }}</span>
    <span class="desc">Lorem ipsum dolar sit amet</span>
    <!--  Upload data modal -->
    <el-dialog title="Upload new data" v-loading="uploading" element-loading-text="Uploading..." :visible.sync="modalUpload" width="480px">
      <el-form :model="dataUploadForm" :rules="dataUploadFormRules" ref="dataUploadForm" label-width="95px" label-position="labelPosition">
        <el-form-item label="Title" prop="title" size="small">
          <el-input v-model="dataUploadForm.title"></el-input>
        </el-form-item>
        <el-form-item label="Description" prop="description" size="small">
          <el-input type="textarea" v-model="dataUploadForm.description"></el-input>
        </el-form-item>
        <el-form-item label="Upload file" prop="file" style="width: 100%" size="small">
          <el-upload ref="csvFile" drag :action="`${axios.defaults.baseURL}/data`" :multiple="false" :auto-upload="false" :on-change="handleFileChange" accept=".csv">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
          <div class="el-upload__tip" slot="tip">csv files only with a size less than 500kb</div>
        </el-upload>
        </el-form-item>
        <el-form-item label="File visibility" prop="isPublic" size="small">
          <el-radio-group v-model="dataUploadForm.isPublic" size="small">
            <el-radio-button :label="true">Public</el-radio-button>
            <el-radio-button :label="false">Users only</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Structure" prop="structure" size="small">
          <el-input type="textarea" v-model="dataUploadForm.structure"></el-input>
        </el-form-item>
        <el-form-item label="Details" prop="details" size="small">
          <el-input type="textarea" v-model="dataUploadForm.details"></el-input>
        </el-form-item>
        <el-form-item label="Preview" prop="preview" size="small">
          <el-input type="textarea" v-model="dataUploadForm.preview"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('dataUploadForm')">Upload data</el-button>
          <el-button @click="resetForm()">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- /Upload data modal -->
  </button>
  <div class="aig__data" v-else>
    <div class="aig__data__head">
      <el-tooltip class="item" :content="readableState" placement="top">
        <Status :status="data.state" />
      </el-tooltip>
      <div class="title">{{ data.title }}</div>
    </div>
    <div class="aig__data__body">
      <div class="desc">{{ data.description }}</div>
    </div>
    <div class="aig__data__footer">
      <!-- <el-button type="primary" size="mini">Models</el-button>
      <el-button size="mini" icon="el-icon-more" @click="$router.push({ name: 'DataInner', params: { id: data.id }})"></el-button> -->
      <router-link class="aig__data__more" :to="{ name: 'DataDetails', params: { id: data.id }}" v-if="data.state != 'created'">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 341.333 341.333" style="enable-background:new 0 0 341.333 341.333;" xml:space="preserve"> <g> <path d="M170.667,85.333c23.573,0,42.667-19.093,42.667-42.667C213.333,19.093,194.24,0,170.667,0S128,19.093,128,42.667 C128,66.24,147.093,85.333,170.667,85.333z"/> <path d="M170.667,128C147.093,128,128,147.093,128,170.667s19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 S194.24,128,170.667,128z"/><path d="M170.667,256C147.093,256,128,275.093,128,298.667c0,23.573,19.093,42.667,42.667,42.667s42.667-19.093,42.667-42.667 C213.333,275.093,194.24,256,170.667,256z"/></g></svg>
      </router-link>
      <span class="desc" style="margin-top: 8px">{{ $t('strings.added') }} {{ this.data.createdUtc | moment('from') }}</span>
    </div>
  </div>

</template>

<script>
import Status from '@/components/Status'
// import errorHanlder from '../utils/errorHandler'
export default {
  name: 'DataItem',
  components: {
    Status
  },
  props: {
    creatable: {
      type: Boolean,
      required: false,
      default: false
    },
    data: {
      required: false,
      type: Object
    }
  },
  data () {
    return {
      modalUpload: false,
      uploading: false,
      dataUploadForm: {
        title: 'Title',
        description: 'Description',
        details: 'Details',
        structure: 'Structure',
        preview: 'Preview',
        isPublic: true,
        file: []
      },
      dataUploadFormRules: {
        title: { required: true, message: 'Title is required', trigger: 'blur' },
        description: { required: true, message: 'Description is required', trigger: 'blur' },
        structure: { required: true, message: 'Structure is required', trigger: 'blur' },
        isPublic: { required: true, message: 'File visibility is required', trigger: 'blur' },
        file: { required: true, message: 'File is required', trigger: 'blur' }
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.uploadData(formName)
        } else {
          return false
        }
      })
    },
    resetForm () {
      this.dataUploadForm = {
        title: '',
        description: '',
        details: '',
        structure: '',
        preview: '',
        isPublic: true,
        file: []
      }
    },
    handleFileChange (file, fileList) {
      this.dataUploadForm.file = file.raw
    },
    uploadData (formName) {
      this.uploading = true
      var uploadForm = new FormData()
      for (var key in this.dataUploadForm) {
        uploadForm.append(key, this.dataUploadForm[key])
      }
      this.axios.post('/data', uploadForm).then(response => {
        this.successfullUpload()
      }, error => {
        console.log(error)
        this.uploading = false
      })
    },
    successfullUpload () {
      this.uploading = false
      this.$notify({
        title: this.$t('data.upload.notifications.titles.success'),
        type: 'success',
        message: this.$t('data.upload.notifications.upload_success')
      })
      this.modalUpload = false
      this.$emit('successfullUpload')
    }
  },
  computed: {
    readableState () {
      if (this.data.state === 'active') {
        return this.$t('status.active')
      } else if (this.data.state === 'closed') {
        return this.$t('status.closed')
      } else {
        return this.$t('status.pending')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~helpers/variables';
@import '~helpers/mixins';

.aig__data {
  @include transition;
  position: relative;
  width: 100%;
  padding: 25px 25px 20px 25px;
  background: white;
  border-radius: 4px;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid darken($gray, 2);
  height: 137px;
  &:hover {
    box-shadow: 0 0 30px 0 rgba($purple, 0.12);
  }
  &.aig__data--creatable {
    cursor: pointer;
    font-family: $font-secondary;
    font-size: 16px;
    font-weight: 400;
    color: $black;
    background: transparent;
    box-shadow: none;
    border: 2px dashed darken($gray, 10);
    .title, .desc {
      display: block;
      height: auto;
    }
    &:hover {
      border-color: darken($gray, 20);
      .description {
        color: $purple;
      }
    }
    &:active {
      border-color: $purple;
      background: white;
    }
  }
  .aig__data__body {
    margin-top: 7px;
  }
  .aig__data__head {
    display: flex;
    align-items: center;
    .aig__status {
      margin-top: -1px;
      &+.title {
        margin-left: 6px;
      }
    }
  }
  .aig__data__footer {
    margin-top: 20px;
    width: 100%;
    font-size: 0;
    .aig__button {
      display: block;
      width: 50%;
      border-radius: 0;
    }
    .desc {
      font-size: 12px;
    }
  }
  .aig__data__more {
    display: block;
    height: 18px;
    width: auto;
    position: absolute;
    right: 7px;
    bottom: 12px;
    svg {
      @include transition(all, 200ms, ease-in-out);
      height: 100%;
      width: auto;
      fill: darken($gray, 25);
      &:hover {
        fill: $purple;
      }
    }
  }
  .title {
    font-family: $font-secondary;
    font-weight: 500;
    font-size: 15px;
  }
  .desc {
    line-height: 1.3;
    color: darken($gray, 50);
    font-size: 13px;
    height: 33px;
    overflow: hidden;
  }
}
</style>
