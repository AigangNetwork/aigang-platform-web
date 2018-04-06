<template>
  <el-row class="edit-title-container">
    <el-row class="input-section-title">{{$t('data.upload.titles.title')}}</el-row>
    <el-form-item prop="title">
      <el-input :placeholder="$t('data.upload.input.placeholder.title')" :value="value" @change="(value) => $emit('input', value)"></el-input>
    </el-form-item>
  </el-row>
</template>
<script>
export default {
  props: ['value']
}
</script>
<style lang="scss" scoped>
</style>
