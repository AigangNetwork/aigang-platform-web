<template>
  <div>
    <div class="aig-card-container" v-loading="loading" :element-loading-text="$t('activateEmail.activating')">
      <Card v-if="!loading" class="guest-card">
        <div class="register-container" slot="body" v-loading="loading">
            <el-row>
              <el-col>
                <div class="aig-logo">
                  <img src="/static/logo-purple.png" alt="">
                </div>
              </el-col>
            </el-row>

            <el-row class="content">
              <h2>{{ $t('activateEmail.title') }}</h2>
              <p>{{ msg }}</p>
            </el-row>
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
<style lang="scss">
  @media screen and (min-width: 100px) and (max-width: 765px) {
    .register-container {
      margin: 10px;
    }
  }

  @media screen and (min-width: 100px) and (max-width: 680px) {
    .aig-card.guest-card .aig-card-body {
      margin-top: 190px !important;
      .register-container {
        .el-row {
          display: flex;
          flex-direction: column;
          width: 100%;
          h2 {
            width: 100%;
            text-align: center;
            margin: 20px 0;
          }
        }
        .el-col-12 {
          width: 100%;
        }
        .redirect-to-login {
          height: 20px;
          margin-top: 390px;
          margin-bottom: -410px;
          text-align: center;
          z-index: 2;
        }
      }
    }
  }
  </style>
