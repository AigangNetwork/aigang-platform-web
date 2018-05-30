<template>
  <el-row>
    <el-row class="input-section-title">{{$t('data.upload.titles.tags')}}</el-row>
    <vue-tags-input :maxlength="15" :maxTags="5" class="custom-try" :autocomplete-items="autoCompleteTags" v-model="tag" @input="inputChanged"
      @blur="onLeave" :tags="tags" @before-adding-tag="checkTag" @tags-changed="tagsChanged" />
    <div v-if="errorOnTag" class="aig-form-error">
      {{errorMessage}}
    </div>
  </el-row>
</template>
<script>
import VueTagsInput from '@johmun/vue-tags-input'
export default {
  components: {
    VueTagsInput
  },
  props: {
    tags: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      tag: '',
      errorMessage: '',
      errorOnTag: false,
      autoCompleteTags: [],
      continue: true
    }
  },
  methods: {
    checkTag (obj) {
      this.errorOnTag = false
      if (obj.tag.text.length <= 3) {
        this.errorOnTag = true
        this.errorMessage = this.$t('data.dataset.validation.invalidTagLength')
        return
      }
      if (/[^a-zA-Z0-9-]/.test(obj.tag.text)) {
        this.errorOnTag = true
        this.errorMessage = this.$t('data.dataset.validation.invalidTag')
        return
      }
      obj.addTag()
    },
    onLeave (value) {
      this.errorOnTag = false
    },
    async inputChanged (text) {
      if (!this.errorOnTag && text.length >= 2) {
        if (this.continue) {
          this.continue = false
          var response = await this.axios.get('tags/' + text)
          if (response.data) {
            this.autoCompleteTags = response.data.map(tag => ({
              text: tag
            }))
          }
          setTimeout(() => {
            this.continue = true
          }, 500)
        }
      }
    },
    tagsChanged (newTags) {
      this.$emit('tagsChanged', newTags)
    }
  }
}

</script>
<style>
  .aig-form-error-improved {
    margin-top: 5px;
    font-size: 12px;
    color: #f56c6c;
  }

</style>
