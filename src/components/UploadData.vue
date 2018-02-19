<template>
    <el-dialog title="Upload new data" v-loading="uploading" :visible.sync="show" @close="updateShowDialog" element-loading-text="Uploading..." width="480px" >
      <el-form :model="dataUploadForm" :rules="dataUploadFormRules" ref="dataUploadForm" label-width="95px" label-position="labelPosition">
        <el-form-item label="Title" prop="title" size="small">
          <el-input v-model="dataUploadForm.title"></el-input>
        </el-form-item>
        <el-form-item label="Description" prop="description" size="small">
          <el-input type="textarea" v-model="dataUploadForm.description"></el-input>
        </el-form-item>
        <el-form-item label="Upload file" prop="file" style="width: 100%" size="small">
          <el-upload ref="csvFile" drag :action="`${axios.defaults.baseURL}/data`"  :multiple="false" :auto-upload="false" :on-change="handleFileChange" accept=".csv">
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
</template>
<script>
export default {
  props: ['showDialog'],
  data () {
    return {
      show: this.showDialog,
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
      this.dataUploadForm.file = fileList = []
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
      this.show = false
      this.$emit('successfullUpload')
    },
    updateShowDialog (isVisible) {
      if (isVisible) return false
      this.$emit('update:showDialog', false)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
