<template>
  <div class="aig-container profile-container">
    <Card class="profile-card">
      <div slot="body" v-loading="loading" :element-loading-text="$t('general.loading')">
        <div class="flex-container">
          <ProfileInfo/>
          <el-button class="logout-button" type="warning" @click="logout()">{{ $t('profile.general.logout') }}</el-button>
        </div>
        <el-tabs type="card" class="profile-tabs">
          <el-tab-pane :label="$t('profile.tabs.profile')">
            <UpdatePassword/>
            <div class="horizontal-line"></div>
            <DeactivateAccount/>
          </el-tab-pane>
          <el-tab-pane :label="$t('profile.tabs.wallets')">
            <Wallets/>
          </el-tab-pane>
          <el-tab-pane :label="$t('profile.tabs.transactions')">
            <Transactions/>
          </el-tab-pane>
        </el-tabs>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/Card'
import ProfileInfo from './profile/ProfileInfo'
import UpdatePassword from './profile/UpdatePassword'
import DeactivateAccount from './profile/DeactivateAccount'
import EmailPreferences from './profile/EmailPreferences'
import Wallets from './profile/Wallets'
import Transactions from './profile/Transactions'

export default {
  name: 'ProfileView',
  components: {
    Card,
    ProfileInfo,
    UpdatePassword,
    EmailPreferences,
    DeactivateAccount,
    Wallets,
    Transactions
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
    .profile-tabs {
      margin-top: 20px;
      .input-section-title {
        margin-top: 20px;
      }
    }
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

    .logout-button.el-button--warning {
      margin-top: 20px;
    }
  }
</style>
