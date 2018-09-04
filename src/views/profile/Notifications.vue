<template>
  <div v-loading="$store.getters.loading" :element-loading-text="$t('general.loading')">
    <el-row v-show="dataLoaded">
      <el-col>
        <p class="input-section-title">{{ $t('profile.notifications.title') }}</p>
      </el-col>
      <el-col>
        <p>{{ $t('profile.notifications.description') }}</p>
      </el-col>
    </el-row>
    <el-row v-show="dataLoaded" v-for="(group, index) in emailPermissionGroups" v-bind:key="index">
      <div class="groups-container">
        <PermissionsGroup :group="group" @changed="onChange" />
      </div>
    </el-row>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'
import PermissionsGroup from './PermissionsGroup'
const { mapGetters } = createNamespacedHelpers('user')

export default {
  components: {
    PermissionsGroup
  },
  data () {
    return {
      dataLoaded: false
    }
  },
  props: ['activeTab'],
  computed: {
    ...mapGetters(['emailPermissionGroups'])
  },
  methods: {
    async onChange (id, value) {
      try {
        await this.$store.dispatch('user/setNotificationPermission', { id, value })
      } catch (error) { }
    },
    async loadNotifications () {
      try {
        let emailPermissionGroups = [{
          title: this.$t('profile.notifications.permissions.general.title'),
          items: [{
            title: this.$t('profile.notifications.permissions.general.items.failedTransactions.title'),
            id: 1,
            value: true,
            description: this.$t('profile.notifications.permissions.general.items.failedTransactions.description')
          }]
        }, {
          title: this.$t('profile.notifications.permissions.insurance.title'),
          items: [{
            title: this.$t('profile.notifications.permissions.insurance.items.all.title'),
            id: 2,
            value: true,
            description: this.$t('profile.notifications.permissions.insurance.items.all.description')
          }]
        }]

        await this.$store.dispatch('user/loadNotificationPermissions', emailPermissionGroups)
      } catch (error) { }
    }
  },
  async mounted () {
    if (!this.dataLoaded) {
      await this.loadNotifications()
      this.dataLoaded = true
    }
  }
}

</script>
<style lang="scss" scoped>
  .groups-container {
    margin-top: 20px;
  }
</style>
