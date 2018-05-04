<template>
  <CommentsView :fetch-comments-callback="fetchComments" />
</template>
<script>
import CommentsView from '@/components/comments/CommentsView.vue'

export default {
  components: {
    CommentsView
  },
  methods: {
    fetchComments () {
      this.axios.get('/comment/' + this.$route.params.id).then(response => {
        return response.data.comments
      })
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
