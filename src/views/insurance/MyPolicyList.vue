<template>
  <el-row v-loading="$store.getters.loading">
    <el-col v-if="!$store.getters.loading">
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
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('insurance')

export default {
  components: {
    PolicyItem
  },
  computed: {
    ...mapGetters(['userPolicies'])
  },
  methods: {
    ...mapActions(['loadUserPolicies'])
  },
  async mounted () {
    try {
      await this.loadUserPolicies(1)
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
