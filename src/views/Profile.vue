<template>
  <div class="aig-container profile-container">
    <Card class="profile-card">
      <div class="profile-content-container" slot="body">
        <div class="flex-container">
          <ProfileInfo/>
          <el-button class="logout-button" type="warning" @click="logout()">{{ $t('profile.general.logout') }}</el-button>
        </div>
        <el-tabs type="card" class="profile-tabs" @tab-click="changeActiveTab">
          <el-tab-pane :label="$t('profile.tabs.profile')">
            <UpdatePassword/>
            <div class="horizontal-line"></div>
            <DeactivateAccount/>
          </el-tab-pane>
          <el-tab-pane :label="$t('profile.tabs.wallets')" name="wallets">
            <Wallets :activeTab="activeTab"/>
          </el-tab-pane>
          <el-tab-pane :label="$t('profile.tabs.transactions')" name="transactions">
            <Transactions :activeTab="activeTab"/>
          </el-tab-pane>
          <el-tab-pane :label="$t('profile.tabs.notifications')" name="notifications">
            <Notifications :activeTab="activeTab"/>
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
import Wallets from './profile/Wallets'
import Transactions from './profile/Transactions'
import Notifications from './profile/Notifications'

export default {
  name: 'ProfileView',
  components: {
    Card,
    ProfileInfo,
    UpdatePassword,
    DeactivateAccount,
    Wallets,
    Transactions,
    Notifications
  },
  data () {
    return {
      activeTab: ''
    }
  },
  methods: {
    logout () {
      this.axios.post('/account/logout').then(response => {
        this.$store.dispatch('logOut')
        this.$router.push('/data')
      })
    },
    changeActiveTab (tab) {
      this.activeTab = tab.name
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
    .profile-content-container {
      padding: 10px;
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
