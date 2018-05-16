<template>
  <div class="aig-container profile-container">
    <Card class="profile-card">
      <div slot="body" v-loading="loading" :element-loading-text="$t('general.loading')">

        <div class="flex-container">
          <ProfileInfo/>
          <el-button class="logout-button" type="warning" @click="logout()">{{ $t('profile.logout') }}</el-button>
        </div>
        <div class="horizontal-line"></div>

        <UpdatePassword/>

        <div class="horizontal-line"></div>
        <DeactivateAccount/>
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
import DeactivateAccount from './profile/DeactivateAccount'

export default {
  name: 'ProfileView',
  components: {
    Card,
    ProfileInfo,
    UpdatePassword,
    EmailPreferences,
    DeactivateAccount
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
      this.axios.post('/account/logout').then(response => {
        this.$store.dispatch('logOut')
        this.$router.push('/data')
      })
    }
  }
}

</script>
<style lang="scss">
  @import '~helpers/variables';
  @import '~helpers/mixins';

  .aig-container.profile-container {
    align-items: flex-start;
  }

  .profile-card.aig-card {
    margin-top: 44px;
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

  .profile-section-decription {
    width: 572px;
    height: 52px;
    line-height: 1.63;
    color: $active-dark-purple;
  }

  @media screen and (min-width: 100px) and (max-width: 680px) {
    .flex-container {
      flex-direction: column;
      align-items: center;
    }
  }
</style>
