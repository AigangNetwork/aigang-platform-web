<template>
  <div>
    <div class="aig__view__body aig__container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">AiGang Network</el-breadcrumb-item>
        <el-breadcrumb-item>Data</el-breadcrumb-item>
      </el-breadcrumb>

      <el-row :gutter="20" class="aig__items" style="margin-top: 30px">
        <el-col :span="8">
          <DataItem :creatable="true" @click="modalUpload = true" />
        </el-col>
        <el-col :span="8" v-for="dataItem in dataList" :key="dataItem.id">
          <DataItem :data="dataItem" :key="dataItem.id" />
        </el-col>
      </el-row>

      <div style="margin-top: 30px">
        <el-dialog title="Upload new data" :visible.sync="modalUpload" width="560px">
          <el-form :model="dataUploadForm" :rules="dataUploadFormRules" ref="dataUploadForm" label-width="120px">
            <el-form-item label="Title" prop="title">
              <el-input v-model="dataUploadForm.name"></el-input>
            </el-form-item>
            <el-form-item label="Description" prop="description">
              <el-input type="textarea" v-model="dataUploadForm.description"></el-input>
            </el-form-item>
            <el-form-item label="Upload file" prop="fileList" style="width: 100%">
              <el-upload drag :file-list="dataUploadForm.fileList" action="/"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
              <div class="el-upload__tip" slot="tip">csv files only with a size less than 500kb</div>
            </el-upload>
            </el-form-item>
            <el-form-item label="File visibility" prop="fileVisibility">
              <el-select v-model="dataUploadForm.fileVisibility" placeholder="Select option" style="width: 100%">
                <el-option label="Users only" value="users"></el-option>
                <el-option label="Public" value="public"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Structure" prop="structure">
              <el-input type="textarea" v-model="dataUploadForm.structure"></el-input>
            </el-form-item>
            <el-form-item label="Preview" prop="preview">
              <el-input type="textarea" v-model="dataUploadForm.preview"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">Upload</el-button>
              <el-button @click="resetForm('ruleForm')">Reset</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
      <el-pagination
        style="text-align: center; margin-top: 30px;"
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import DataItem from '@/components/DataItem'

export default {
  name: 'DataView',
  components: {
    DataItem
  },
  data () {
    return {
      dataList: [],
      modalUpload: false,
      msg: 'Data view',
      dataUploadForm: {
        title: '',
        description: '',
        fileVisibility: 'users',
        fileList: [],
        structure: '',
        preview: ''
      },
      dataUploadFormRules: {
        title: { required: true, message: 'Title is required', trigger: 'blur' },
        description: { required: true, message: 'Description is required', trigger: 'blur' },
        structure: { required: true, message: 'Structure is required', trigger: 'blur' },
        preview: { required: true, message: 'Preview is required', trigger: 'blur' },
        fileVisibility: { required: true, message: 'Select option', trigger: 'blur' }
      }
    }
  },
  mounted () {
    this.axios.get('/data/list?page=1').then(response => {
      this.dataList = response.data.items
      console.log(response)
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~helpers/mixins';
</style>
