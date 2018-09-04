<template>
  <el-row v-loading="loading">
    <el-col v-if="!loading">
      <div class="policy-item" v-for="(item, index) in userPolicies" :key="index">
        <router-link :to="{ name: 'Policy', params: { policyId: item.id } }">
          <PolicyItem :policy="item" />
        </router-link>
      </div>
      <div v-if="userPolicies && userPolicies.length === 0">
        <h2>{{ $t('general.noPolicies') }}</h2>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import PolicyItem from '@/components/insurance/PolicyItem.vue'
import {
  mapGetters
} from 'vuex'
export default {
  components: {
    PolicyItem
  },
  computed: {
    ...mapGetters(['userPolicies', 'loading'])
  },
  async mounted () {
    try {
      await this.$store.dispatch('loadUserPolicies', 1)
    } catch (error) { }
  }
}

</script>
<style lang="scss" scoped>
  .policy-item {
    margin: 10px 0px 10px 0px;
  }

  h2 {
    margin: 20px;
  }
</style>
