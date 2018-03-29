<template>
  <el-container class="aig-container-dataset" v-loading="loading">
    <div class="dataset-edit-container">
      <DatasetFileCard v-model="datasetForm.isPublic" :showUploadButton="true" />
      <div class="dataset-body-container">
        <el-form @keyup.enter.native="submitForm('datasetForm')" :model="datasetForm" :rules="datasetFormRules" ref="datasetForm">

          <el-row class="profile-section-title">
            {{ $t('data.dataset.edit.title' )}}
          </el-row>
          <el-row>
            <el-form-item prop="title">
              <el-input class="profile-info-input" type="textarea" autosize v-model="datasetForm.title" :placeholder="$t('data.dataset.edit.title' )"></el-input>
            </el-form-item>
          </el-row>

          <el-row class="profile-section-title">
            {{ $t('data.dataset.edit.description' )}}
          </el-row>
          <el-row>
            <el-form-item prop="description">
              <el-input class="profile-info-input description" type="textarea" autosize v-model="datasetForm.description" :placeholder="$t('data.dataset.edit.description' )"></el-input>
            </el-form-item>
          </el-row>

          <el-row class="profile-section-title">
            {{ $t('data.dataset.edit.structure' )}}
          </el-row>
          <el-row class="structure-row" :gutter="20" type="flex" v-for="(column,index) in datasetForm.structure" :key="column.name">
            <el-col :span="10">
              <el-form-item :prop="'datasetForm.structure['+index+'].name'">
                <el-input class="profile-info-input description structure-title" type="text" autosize v-model="column.name" :placeholder="$t('data.dataset.edit.structureName' )"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item :prop="'structureDescription'+index">
                <el-input class="profile-info-input description" type="text" autosize v-model="column.description" :placeholder="$t('data.dataset.edit.structureDescription' )"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="column-decsription" :span="10">
              <el-form-item :prop="'structureDataType'+index">
                <el-input class="profile-info-input description" type="text" autosize v-model="column.dataType" :placeholder="$t('data.dataset.edit.structureDataType' )"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-form-item>
              <el-button class="aig-button" type="primary" @click="submitForm('datasetForm')">{{ $t('general.save') }}</el-button>
            </el-form-item>
          </el-row>

        </el-form>
      </div>
    </div>
  </el-container>
</template>
<script>
import DatasetFileCard from '@/components/data/DatasetFileCard'

export default {
  components: {
    DatasetFileCard
  },
  data () {
    return {
      loading: false,
      dataset: {},
      datasetForm: {
        title: '',
        description: '',
        isPublic: true,
        structure: []
      },
      datasetFormRules: {
        title: [
          { required: true, message: this.$t('validation.datasetTitleEmpty'), trigger: 'blur' },
          { min: 6, message: this.$t('validation.datasetTitleTooShort'), trigger: 'blur' }
        ],
        description: [
          { required: true, message: this.$t('validation.datasetDescriptionEmpty'), trigger: 'blur' },
          { min: 6, message: this.$t('validation.datasetDescriptionTooShort'), trigger: 'blur' }
        ]
        // structureTitle: [
        //   { required: true, message: this.$t('validation.datasetStructureTitleEmpty'), trigger: 'blur' },
        //   { min: 4, message: this.$t('validation.datasetStructureTitleTooShort'), trigger: 'blur' }
        // ],
        // structureDescription: [
        //   { required: true, message: this.$t('validation.datasetStructureDescriptionEmpty'), trigger: 'blur' },
        //   { min: 6, message: this.$t('validation.datasetStructureDescriptionTooShort'), trigger: 'blur' }
        // ],
        // structureDataType: [
        //   { required: true, message: this.$t('validation.datasetStructureDataTypeEmpty'), trigger: 'blur' },
        //   { min: 3, message: this.$t('validation.datasetStructureDataTypeTooShort'), trigger: 'blur' }
        // ]
      }
    }
  },
  methods: {
    fetchDataset () {
      this.loading = true
      this.axios.get('/data/' + this.$route.params.id).then(response => {
        this.loading = false
        this.dataset = response.data.data
        if (this.$store.state.user.profile.id === this.dataset.userId) {
          this.isUserOwner = true
        }
        this.initializeDatasetForm(this.dataset)
      })
    },
    submitForm (formName) {
      this.loading = true
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.saveInfo()
        } else {
          this.loading = false
          return false
        }
      })
    },
    initializeDatasetForm (dataset) {
      this.datasetForm.title = dataset.title
      this.datasetForm.description = dataset.description
      this.datasetForm.structure = JSON.parse(dataset.structure)

      this.datasetForm.structure.forEach((item, index) => {
        const structureTitle = 'datasetForm.structure[' + index + '].name'
        const structureDescription = 'structureDescription' + index
        const structureDataType = 'structureDataType' + index

        const tempObj = {
          [structureTitle]: [
            { required: true, message: this.$t('validation.datasetStructureTitleEmpty'), trigger: 'blur' },
            { min: 4, message: this.$t('validation.datasetStructureTitleTooShort'), trigger: 'blur' }
          ],
          [structureDescription]: [
            { required: true, message: this.$t('validation.datasetStructureDescriptionEmpty'), trigger: 'blur' },
            { min: 6, message: this.$t('validation.datasetStructureDescriptionTooShort'), trigger: 'blur' }
          ],
          [structureDataType]: [
            { required: true, message: this.$t('validation.datasetStructureDataTypeEmpty'), trigger: 'blur' },
            { min: 3, message: this.$t('validation.datasetStructureDataTypeTooShort'), trigger: 'blur' }
          ]
        }
        Object.assign(this.datasetFormRules, tempObj)
      })
    }
  },
  created () {
    this.fetchDataset()
  }
}
</script>
<style lang="scss" scoped>
  .aig-container-dataset {
    background: white;
  }

  .dataset-edit-container {
    max-width: 655px;
    width: 100%;
    margin: 40px auto;
  }

  .dataset-body-container {
    .profile-section-title {
      margin-top: 40px;
      margin-bottom: 4px;
      height: 19px;
      font-size: 14px;
    }

    .profile-info-input {
      input {
        font-size: 24px;
      }
    }
  }

  .save-updated-dataset-btn button {
    width: 100%;
  }
</style>
