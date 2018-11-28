<template>
  <el-row>
    <div class="description-header">
      <h4 class="input-section-title">{{$t('data.upload.titles.description')}}</h4>
      <router-link to="" @click.native="popUpMakdownRules">
        {{$t('general.markupSupported')}}
      </router-link>
    </div>
    <el-form-item prop="description" size="small">
      <el-input :placeholder="$t('data.upload.input.placeholder.description')" type="textarea" :value="value" @change="value => $emit('input', value)" rows="10"></el-input>
    </el-form-item>
  </el-row>
</template>
<script>
export default {
  props: ['value'],
  methods: {
    popUpMakdownRules (event) {
      event.preventDefault()
      window.open('http://miaolz123.github.io/vue-markdown/', '_blank')
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~helpers/variables';

  .description-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    a {
      font-size: 13px;
      &:hover {
        color: $orange;
      }
    }
  }
</style>
