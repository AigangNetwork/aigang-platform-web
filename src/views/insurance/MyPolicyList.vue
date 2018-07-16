<template>
  <div v-loading="loading">
    <div class="policy-item" v-for="(item, index) in userPolicies.policies" :key="index">
      <PolicyItem :policy="item" />
    </div>
  </div>
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
    ...mapGetters(['userPolicies'])
  },
  data () {
    return {
      loading: false
    }
  },
  async mounted () {
    try {
      this.loading = true
      await this.$store.dispatch('loadUserPolicies', 1)
    } catch (error) {
      this.loading = false
    }
    this.loading = false
  }
}

</script>
<style lang="scss" scoped>
  .policy-item {
    margin: 10px 0px 10px 0px;
  }

</style>
