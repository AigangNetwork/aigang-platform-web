<template>
  <div class="aig-dataset-info-container" v-loading="loading">
    <h4 class="info-title">{{$t('data.dataset.threads.threads')}}</h4>
    <div v-if="$store.state.user.authenticated">
      <el-row>
        <el-col class="comment-column">
          <NewComment @refresh-comment="fetchComments()" />
        </el-col>
        <el-col class="comment-column" v-for="(comment, index) in comments" v-bind:key="index">
          <Comment :show-reply-button="true" @refresh-comment="fetchComments()" :comment="comment" :is-owner="isOwner(comment.userId)"
          />
          <div v-if="comment.replies" v-for="(reply, index) in comment.replies" v-bind:key="index">
            <Comment :is-reply="true" :comment="reply" :is-owner="isOwner(reply.userId)" @refresh-comment="fetchComments()" />
          </div>
          <ReplyComment :parent-id="comment.id" @refresh-comment="fetchComments()" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import NewComment from '@/components/comments/NewComment.vue'
import ReplyComment from '@/components/comments/ReplyComment.vue'
import Comment from '@/components/comments/Comment.vue'
export default {
  props: {
    fetchCommentsCallback: {
      required: true,
      type: Function
    }
  },
  components: {
    NewComment,
    Comment,
    ReplyComment
  },
  data () {
    return {
      loading: false,
      comments: []
    }
  },
  methods: {
    async fetchComments () {
      this.loading = true
      this.comments = await this.fetchCommentsCallback()
      this.loading = false
      // this.axios.get('/comment/' + this.$route.params.id).then(response => {
      //   this.comments = response.data.comments
      //   this.loading = false
      // }).catch(e => {
      //   this.loading = false
      // })
    },
    isOwner (userId) {
      return this.$store.state.user.profile.id === userId
    }
  },
  created () {
    this.fetchComments()
  }
}

</script>
<style lang="scss">
  .comment-column {
    margin-bottom: 45px;
    border: solid 1px #c8d0f1;
  }

</style>
