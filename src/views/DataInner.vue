<template>
  <div class="aig__container">
    <div class="aig__view__head">
      <el-breadcrumb class="aig__breadcrumbs" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">AiGang Network</el-breadcrumb-item>
        <el-breadcrumb-item to="/data">{{ $t('anchors.data') }}</el-breadcrumb-item>
        <el-breadcrumb-item>{{ data.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="aig__view__heading">
        <div class="aig__view__title">{{ data.title }}</div>
        <div class="aig__view__description">
          <p>{{ data.description }}</p>
        </div>
      </div>
    </div>
    <div class="aig__view__body">
      <el-row :gutter="40">
        <el-col :lg="6">
          <div class="aig__sidemenu">
            <div class="aig__sidemenu__group">
              <div class="head">
                <div class="title">More information</div>
              </div>
              <div class="body">
                <ul class="menu">
                  <li>
                    <router-link :to="{ name: 'DataDetails' }">Details</router-link>
                  </li>
                  <li>
                    <router-link :to="{ name: 'DataModels' }">Models</router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="18">
          <transition name="slideUp">
            <router-view></router-view>
          </transition>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
export default {
  name: 'DataInnerView',
  methods: {
    getData () {
      this.axios.get(`/data/${this.$route.params.id}`).then(response => {
        this.data = response.data.data
      })
    }
  },
  data () {
    return {
      data: {}
    }
  },
  mounted () {
    this.getData()
  }
}
</script>

<style lang="scss">

</style>
