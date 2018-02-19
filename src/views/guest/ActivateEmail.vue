<template>

  <div class="aig__view-centered">
    <div class="aig__view__body aig__container" style="max-width: 400px">
      <Card>
        <div slot="body" v-loading="loading" :element-loading-text="$t('activateEmail.activating')">
          <h1>{{ msg }}</h1>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card'

export default {
  name: 'ActivateEmailView',
  components: {
    Card
  },
  data () {
    return {
      loading: true,
      msg: ''
    }
  },
  created: function () {
    let userId = this.$route.query.id
    let token = this.$route.query.token

    if (userId && token) {
      this.axios.post(`/account/verifyemail?Id=${userId}&Token=${token}`).then(response => {
        this.msg = 'Your account was successfuly activated'
        this.loading = false
      }).catch(error => {
        this.$message({
          type: 'error',
          message: error.response.data.params.ValidationFailed[0].reason,
          showClose: true
        })
        this.loading = false
        console.log(error.response)
      })
    } else { // TODO: invalid url show general error and log it
      this.$message({
        type: 'error',
        message: 'Bad request',
        showClose: true
      })
      this.msg = 'Bad request'
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~helpers/mixins';
@import '~helpers/variables';

</style>
