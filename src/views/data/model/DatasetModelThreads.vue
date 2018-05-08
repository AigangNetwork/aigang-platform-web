<template>
  <CommentsView :entity-id="this.$route.params.modelId" :fetch-comments-url="fetchPath" />
</template>
<script>
import CommentsView from '@/components/comments/CommentsView.vue'
export default {
  components: {
    CommentsView
  },
  data () {
    return {
      fetchPath: '/comment/' + this.$route.params.modelId
    }
  }
}

</script>
<style lang="scss"></style>
