<template>
  <CommentsView :update-comments-count-event="updateEventName" :entity-id="this.$route.params.id" :fetch-comments-url="fetchPath" />
</template>
<script>
import CommentsView from '@/components/comments/CommentsView.vue'
import eventHub from '@/utils/eventHub'

export default {
  components: {
    CommentsView
  },
  data () {
    return {
      fetchPath: '/comment/' + this.$route.params.id,
      updateEventName: eventHub.eventChangeCommentsCountForDataset
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
