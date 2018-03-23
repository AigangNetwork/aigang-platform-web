<template>
  <div class="aig-container">
    <Card class="profile-card">
      <div slot="body" v-loading="loading" :element-loading-text="$t('general.loading')">

        <div class="flex-container">
          <ProfileInfo/>
          <el-button class="logout-button" type="warning" @click="logout()">{{ $t('profile.logout') }}</el-button>
        </div>
        <div class="horizontal-line"></div>

        <UpdatePassword/>

        <!--
        <div class="horizontal-line"></div>

        <EmailPreferences/>
        -->

      </div>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/Card'
import ProfileInfo from './profile/ProfileInfo'
import UpdatePassword from './profile/UpdatePassword'
import EmailPreferences from './profile/EmailPreferences'

export default {
  name: 'ProfileView',
  components: {
    Card,
    ProfileInfo,
    UpdatePassword,
    EmailPreferences
  },
  data () {
    return {
      loading: false,
      emailPreferences: {
        isModelCommentsEnabled: false,
        isDataSetCommentsEnabled: false,
        isNewDataCommentsEnvabled: false,
        isNewsEnabled: false
      }
    }
  },
  methods: {
    logout () {
      this.axios.post('/account/logout')
        .then(response => {
          this.$store.dispatch('logOut')

          this.$router.push('/')
        })
        .catch(e => { })
    }
  }
}
</script>
<style lang="scss">
  @import '~helpers/variables';
  @import '~helpers/mixins';

  .profile-button span {
    height: 16px;
    font-size: 14px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: normal;
    letter-spacing: 0.5px;
    text-align: center;
  }

  .profile-card .el-button--warning {
    width: 100%;
    margin: 10px 0;
  }

  .logout-button.el-button--warning {
    width: 100px;
    display: inline;
    height: 40px;
  }

  .profile-button {
    margin-top: 8px;
    margin-left: 0px;
    width: 131px;
    height: 32px;
    background-color: $white;
    color: $button-purple;
    border: 1px solid $light-grey;
    padding: 0;
    border-radius: 2px;
    &:hover {
      background-color: $button-purple;
      color: $white;
      transition: all 200ms;
    }
  }

  .profile-info-container .profile-info-input input {
    padding: 8px;
    border: none;
    border-bottom: 1px solid $active-dark-purple;
    border-radius: 0;
    font-family: 'Raleway', sans-serif;
    font-size: 18px;
    font-weight: normal;
    line-height: 1.33;
    letter-spacing: 0.5px;
    color: #423176;
    text-shadow: 0 2px 4px rgba(219, 224, 231, 0.5);
    height: 24px;
    padding-top: 0;
    min-width: 140px;
    margin-right: 20px;
  }

  .profile-info-container .profile-info-input {
    margin-bottom: 0px !important;
  }

  .profile-section-title {
    width: 320px;
    height: 19px;
    font-family: $font-primary;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 0.6px;
    text-align: left;
    color: $dark-gray;
    text-transform: uppercase;
    margin: 0;
  }

  .profile-section-decription {
    width: 572px;
    height: 52px;
    line-height: 1.63;
    color: $active-dark-purple;
  }

  @media (min-device-width: 100px) and (max-device-width: 680px) {
    .flex-container {
      flex-direction: column;
      align-items: center;
    }
  }
</style>
