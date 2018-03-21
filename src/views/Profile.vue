<template>
  <div class="aig-container">
    <div class="">

      <div class="">
        <div class="">Profile</div>
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
