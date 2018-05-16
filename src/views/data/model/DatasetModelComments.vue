<template>
  <CommentsView :update-comments-count-event="updateEventName" :entity-id="this.$route.params.modelId" :fetch-comments-url="fetchPath"
  />
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
      fetchPath: '/comment/' + this.$route.params.modelId,
      updateEventName: eventHub.eventChangeCommentsCountForDataModel
    }
  }
}

</script>
<style lang="scss"></style>
