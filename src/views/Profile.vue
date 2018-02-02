<template>
  <div class="aig__container">
    <div class="aig__view__head">
      <el-breadcrumb class="aig__breadcrumbs" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">AiGang Network</el-breadcrumb-item>
        <el-breadcrumb-item to="/">Profile</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="aig__view__heading">
        <div class="aig__view__title">Profile</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileView',
  data () {
    return {
      msg: 'Profile view'
    }
  }
}
</script>
