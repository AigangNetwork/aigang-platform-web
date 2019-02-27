<template>
  <div class="aig-container profile-container" v-loading="profileViewLoading">
    <Card class="profile-card">
      <div class="profile-content-container" slot="body">
        <div class="flex-container">
          <ProfileInfo/>
          <el-button class="logout-button" type="warning" @click="logoutHandler">{{ $t('profile.general.logout') }}</el-button>
        </div>
        <el-tabs type="card" v-model="activeTab" class="profile-tabs" @tab-click="changeActiveTab">
          <el-tab-pane :label="$t('profile.tabs.profile')" name="ProfileGeneral" />
          <el-tab-pane :label="$t('profile.tabs.notifications')" name="ProfileNotifications" />
        </el-tabs>
        <router-view class="tab-content" key="test"></router-view>
      </div>
    </Card>
  </div>
</template>

<script>
import Card from '@/components/Card'
import ProfileInfo from '@/components/profile/ProfileInfo'
import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('user')

export default {
  components: {
    Card,
    ProfileInfo
  },
  data () {
    return {
      activeTab: this.$route.name,
      profileViewLoading: false
    }
  },
  methods: {
    ...mapActions(['logOut']),
    logoutHandler () {
      this.profileViewLoading = true
      this.logOut()
    },
    changeActiveTab (tab) {
      switch (tab.name) {
        case 'ProfileNotifications':
          this.$router.push('/profile/notifications')
          break
        default:
          this.$router.push('/profile/general')
      }
    }
  },
  mounted () {
    if (!this.$store.getters['user/isAuthenticated']) {
      this.$router.push({
        name: 'Login'
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
    .profile-content-container {
      padding: 10px;
      .tab-content {
        margin-top: -20px;
        min-height: 200px;
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
