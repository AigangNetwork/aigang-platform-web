<template>
  <CommentsView :entity-id="this.$route.params.id" :fetch-comments-url="fetchPath" />
</template>
<script>
import CommentsView from '@/components/comments/CommentsView.vue'

export default {
  components: {
    CommentsView
  },
  data () {
    return {
      fetchPath: '/comment/' + this.$route.params.id
    }
  }
}

</script>
<style lang="scss">
  .comment-column {
    margin-bottom: 45px;
    border: solid 1px #c8d0f1;
  }

</style>
