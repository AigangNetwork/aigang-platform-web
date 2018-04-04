<template>
  <el-container class="aig-container-dataset" v-loading="loading">
    <el-button @click="$router.go(-1)" class="profile-button back-button">{{ $t('general.back') }}</el-button>
    <div class="dataset-edit-container">
      <DatasetFileCard v-model="datasetForm.isPublic" :showUploadOption="true" />

      <div class="dataset-body-container">
        <el-form @keyup.enter.native="submitForm('datasetForm')" :model="datasetForm" :rules="datasetFormRules" ref="datasetForm">

          <el-row class="profile-section-title">
            {{ $t('data.dataset.edit.title' )}}
          </el-row>
          <el-row>
            <el-form-item prop="title">
              <el-input class="profile-info-input" type="textarea" autosize :maxlength="64" v-model="datasetForm.title" :placeholder="$t('data.dataset.edit.title' )"></el-input>
            </el-form-item>
          </el-row>

          <el-row class="profile-section-title">
            {{ $t('data.dataset.edit.description' )}}
            <router-link class="markdown-label" to="" @click.native="popUpMakdownRules">
              {{$t('general.markupSupported')}}
            </router-link>
            <!-- <span class="markdown-label">{{ $t('general.markupSupported' )}}</span> -->
          </el-row>
          <el-row>
            <el-form-item prop="description">
              <el-input class="profile-info-input description" type="textarea" autosize v-model="datasetForm.description" :placeholder="$t('data.dataset.edit.description' )"></el-input>
            </el-form-item>
          </el-row>

          <el-row class="profile-section-title">
            {{ $t('data.dataset.edit.structure' )}}
          </el-row>
          <el-row v-if="datasetStructure" class="structure-row" :gutter="20" type="flex" v-for="(column,index) in datasetStructure"
            :key="index">
            <el-col :span="10">
              <el-form-item>
                <el-input class="profile-info-input description structure-title" type="text" v-model="column.name" :placeholder="$t('data.dataset.edit.structureName' )"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item>
                <el-input class="profile-info-input description" type="textarea" v-model="column.description" :placeholder="$t('data.dataset.edit.structureDescription' )"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="column-description" :span="10">
              <el-form-item>
                <el-select class="profile-info-input select-input" size="medium" aria-required="true" v-model="column.dataType" :placeholder="$t('data.upload.input.placeholder.dataType')">
                  <el-option v-for="item in dataTypeOptions" :key="item" :label="item" :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row v-if="!isStructureValid">
            <div class="aig-form-error">
              {{$t('data.dataset.validation.StructureFieldEmpty')}}
            </div>
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
      dataTypeOptions: ['String', 'Numeric', 'Boolean'],
      isStructureValid: true,
      datasetStructure: [],
      isFileAccessRemote: false,
      datasetForm: {
        id: '',
        title: '',
        description: '',
        isPublic: true,
        structure: '',
        createdUtc: '',
        hasFileChanged: false,
        file: null,
        remoteFileAccessPoint: ''
      },
      datasetFormRules: {
        title: [{
          required: true,
          message: this.$t('data.dataset.validation.TitleEmpty'),
          trigger: 'blur'
        },
        {
          min: 6,
          message: this.$t('data.dataset.validation.TitleTooShort'),
          trigger: 'blur'
        }
        ],
        description: [{
          required: true,
          message: this.$t('data.dataset.validation.DescriptionEmpty'),
          trigger: 'blur'
        },
        {
          min: 6,
          message: this.$t('data.dataset.validation.DescriptionTooShort'),
          trigger: 'blur'
        }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.loading = true
      this.isStructureValid = true
      this.validateStructure(this.datasetStructure)

      if (!this.isStructureValid) {
        this.loading = false
        return false
      }

      this.datasetForm.structure = JSON.stringify(this.datasetStructure)
      this.datasetForm.remoteFileAccessPoint = this.$store.state.currentDataset.remoteFileAccessPoint
      debugger
      this.datasetForm.file = this.$store.state.currentDataset.file.raw // todo check file is empty
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.updateDataset()
        } else {
          this.loading = false
          return false
        }
      })
    },
    updateDataset () {
      let form = new FormData()

      for (var key in this.datasetForm) {
        form.append(key, this.datasetForm[key])
      }

      this.axios.post('/data/update', form).then(response => {
        this.loading = false
        this.$notify({
          title: this.$t('data.upload.notifications.titles.success'),
          type: 'success',
          message: this.$t('data.dataset.edit.edit_success')
        })
      }, e => {
        this.loading = false
      })
    },
    initializeDatasetForm (dataset) {
      this.datasetForm.title = dataset.title
      this.datasetForm.description = dataset.description
      this.datasetForm.createdUtc = dataset.createdUtc
      this.datasetForm.id = dataset.id
      this.datasetForm.isPublic = dataset.isPublic

      try {
        this.datasetStructure = JSON.parse(dataset.structure)
      } catch (e) { // todo why null?
        this.datasetStructure = null
      }
    },
    validateStructure (structure) {
      if (structure.length > 0) {
        for (var obj in structure) {
          for (var prop in structure[obj]) {
            if (structure[obj][prop] === undefined || structure[obj][prop] === '') {
              this.isStructureValid = false
              return
            }
          }
        }
      }
      // } else {
      //   if (this.remoteFileStructure.length <= 0) {
      //     this.isValidForm = false
      //   }
      // }
    },
    popUpMakdownRules (event) {
      event.preventDefault()
      window.open('http://miaolz123.github.io/vue-markdown/', '_blank')
    }
  },

  created () {
    this.initializeDatasetForm(this.$store.getters.dataset)
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
      width: 100%;
      display: flex;
      .markdown-label {
        font-family: Roboto;
        flex-grow: 1;
        text-align: right;
        color: black;
        font-weight: 500;
        font-size: 12px;
        line-height: 19px;
        text-transform: none;
      }
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

  .back-button {
    margin-top: 40px;
  }

  @media screen and (min-width: 680px) and (max-width: 1024px) {
    .aig-container-dataset {
      display: block;
      .back-button {
        margin: 20px;
      }
    }
  }

  @media screen and (min-width: 100px) and (max-width: 680px) {
    .aig-container-dataset {
      display: block;
      .back-button {
        margin: 20px;
      }

      .dataset-edit-container {
        margin-top: 20px;
        padding: 20px
      }
    }
  }

</style>
