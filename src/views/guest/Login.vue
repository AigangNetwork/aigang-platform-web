<template>
  <div class="">
    <div class="aig-card-container">

      <Card class="guest-card">

        <div slot="body" v-loading="loading" :element-loading-text="$t('general.loading')">

          <el-row>
            <el-col>
              <div class="aig-logo">
                <img src="/static/logo-purple.png" alt="">
              </div>
            </el-col>
          </el-row>

          <el-row type="flex" justify="center">

            <el-col :span="10">
              <h2>{{ $t('login.title') }}</h2>

              <el-form @keyup.enter.native="submitForm('loginForm', login)" :model="loginForm" :rules="loginFormRules" ref="loginForm">

                <el-row>
                  <el-col>
                    <span class="label">{{ $t('login.email' )}}</span>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item prop="email">
                      <el-input class="aig-card-input" v-model="loginForm.email" :placeholder="$t('login.email')"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <span class="label">{{ $t('login.password' )}}</span>
                  </el-col>
                  <el-col :span="12" style="text-align: right;">
                    <router-link class="a-passive " to="/forgotPassword">{{ $t('login.forgotPassword') }}</router-link>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col>
                    <el-form-item prop="password">
                      <el-input class="aig-card-input" v-model="loginForm.password" type="password" placeholder="********"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col>
                    <el-form-item>
                      <el-button type="primary" @click="submitForm('loginForm', login)">{{ $t('login.login') }}</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>

              </el-form>
            </el-col>

          </el-row>

          <el-row type="flex" justify="center" style="height:100px;align-items: flex-end;">
            <el-col :span="10" style="text-align: center;">
              <span>{{ $t('login.dontHave') }}</span>
              <router-link class="a-active" to="/register">{{ $t('signUp.signUp') }}</router-link>
            </el-col>
          </el-row>

        </div>
      </Card>

    </div>
  </div>
</template>

<script>
import Card from '@/components/Card'
import FormMixin from '@/components/mixins/FormMixin'

export default {
  name: 'LoginView',
  components: {
    Card
  },
  mixins: [FormMixin],
  data () {
    return {
      loading: false,
      loginForm: {
        email: '',
        password: ''
      },
      loginFormRules: {
        email: [{
          required: true,
          message: this.$t('validation.emailEmpty'),
          trigger: 'blur'
        },
        {
          type: 'email',
          message: this.$t('validation.emailNotValid'),
          trigger: 'blur'
        }
        ],
        password: [{
          required: true,
          message: this.$t('validation.passwordEmpty'),
          trigger: 'blur'
        },
        {
          min: 6,
          message: this.$t('validation.passwordTooShort'),
          trigger: 'blur'
        }
        ]
      }
    }
  },
  methods: {
    login () {
      this.loading = true
      this.axios.post('/account/login', this.loginForm).then(response => {
        this.$store.dispatch('logIn', response)
        this.$router.push('/data')
      }).catch(e => {
        this.loading = false
      })
    }
  }
}

</script>
