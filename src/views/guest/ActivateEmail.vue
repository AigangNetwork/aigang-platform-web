<template>

  <div class="">
    <div class="aig-container" style="max-width: 400px">
      <Card>
        <div slot="body" v-loading="loading" :element-loading-text="$t('activateEmail.activating')">
          <p>{{ msg }}</p>
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
        this.msg = this.$t('activateEmail.activated')
        this.loading = false
      }).catch(e => {
        this.loading = false
      })
    } else {
      this.msg = this.$t('errors.400')
      this.loading = false
    }
  }
}
</script>
