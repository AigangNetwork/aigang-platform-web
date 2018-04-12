<template>
  <el-row>
    <el-row class="input-section-title">{{$t('data.dataset.model.premium')}}</el-row>
    <el-form-item prop="premium">
      <el-input :placeholder="$t('data.upload.input.placeholder.premium')" :value="value" @change="(value) => $emit('input', value)"></el-input>
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
