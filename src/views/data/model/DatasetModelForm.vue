<template>
  <div class="aig-dataset-info-container" v-loading="loading">
    <h4 class="info-title">{{$t('data.dataset.model.editModel')}}</h4>
    <el-form @keyup.enter.native="submitForm('modelForm', postDataModel)" :model="modelForm" :rules="modelFormRules" ref="modelForm">

      <DatasetTitleEdit v-model="modelForm.title" />

      <DatasetPremiumEdit v-model="modelForm.premium" />

      <DatasetDescriptionEdit v-model="modelForm.description" />

      <DatasetModelEdit v-model="model" />

      <el-row>
        <el-form-item>
          <el-button class="aig-button" type="primary" @click="submitForm('modelForm', postDataModel)">
            <template v-if="isUpload">{{ $t('data.dataset.model.submitModel') }}</template>
            <template v-else>{{ $t('general.save') }}</template>
          </el-button>
        </el-form-item>
      </el-row>
    </el-form>

  </div>
</template>
<script>
import DatasetTitleEdit from '@/components/data/DatasetTitleEdit'
import DatasetDescriptionEdit from '@/components/data/DatasetDescriptionEdit'
import DatasetPremiumEdit from '@/components/data/DatasetPremiumEdit'
import FormMixin from '@/components/mixins/FormMixin'
import DatasetModelEdit from '@/components/data/model/DatasetModelEdit'

export default {
  props: ['isUpload', 'getPath', 'postPath', 'callback'],
  components: {
    DatasetTitleEdit,
    DatasetDescriptionEdit,
    DatasetPremiumEdit,
    DatasetModelEdit
  },
  mixins: [FormMixin],
  data () {
    return {
      loading: false,
      model: [],
      modelForm: {
        title: '',
        description: '',
        premium: '',
        model: '',
        dataId: ''
      },
      modelFormRules: {
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
        ],
        premium: [{
          required: true,
          message: this.$t('data.dataset.validation.PremiumEmpty'),
          trigger: 'blur'
        }, {
          pattern: /^\d*\.?\d*$/,
          message: this.$t('data.dataset.validation.PremiumInvalidNumber'),
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    postDataModel () {
      this.loading = true
      this.modelForm.model = JSON.stringify(this.model)

      let uploadForm = new FormData()

      for (let key in this.modelForm) {
        uploadForm.append(key, this.modelForm[key])
      }

      this.axios.post(this.postPath, uploadForm)
        .then(response => {
          this.loading = false
          this.$notify({
            title: this.$t('data.dataset.model.notification.title.success'),
            type: 'success',
            message: this.isUpload ? this.$t('data.dataset.model.notification.successfullyUploaded')
              : this.$t('data.dataset.model.notification.successfullyUpdated')
          })
          this.callback()
          // TO_DO redirect to data models list page
        }).catch(e => {
          this.loading = false
        })
    }
  },
  created () {
    if (!this.isUpload) {
      this.loading = true
      this.axios.get(this.getPath)
        .then(response => {
          this.loading = false
          this.modelForm = response.data.data
          this.model = JSON.parse(response.data.data.model)
        })
        .catch(e => {
          this.loading = false
        })
    }
  },
  mounted () {
    this.modelForm.dataId = this.$store.state.currentDataset.id
  }
}

</script>
<style></style>
