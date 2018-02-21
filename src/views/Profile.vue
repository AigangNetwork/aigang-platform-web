<template>
  <div class="aig__container">
    <div class="aig__view__head">
      <el-breadcrumb class="aig__breadcrumbs" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/">AiGang Network</el-breadcrumb-item>
        <el-breadcrumb-item to="/">Profile</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="aig__view__heading">
        <div class="aig__view__title">Profile</div>
        <br>
        <br>
        <el-button type="warning" @click="logout()">{{ $t('profile.logout') }}</el-button>
        <br>
        <br>
        <br>
        <p>{{ $t('profile.userName') }} {{ $store.state.user.profile.userName }}</p>
        <p>{{ $t('profile.email') }} {{ $store.state.user.profile.email }}</p>
        <p>{{ $t('profile.firstName') }} {{ $store.state.user.profile.firstName }}</p>
        <p>{{ $t('profile.lastName') }} {{ $store.state.user.profile.lastName }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileView',
  data () {
    return {
      msg: 'Profile view msg'
    }
  },
  methods: {
    logout () {
      this.axios.post('/account/logout').then(response => {
        this.$store.dispatch('logOut')

        this.$router.push('/')
      }).catch(e => {
        // this.loading = false
      })
    }
  }
}
</script>
