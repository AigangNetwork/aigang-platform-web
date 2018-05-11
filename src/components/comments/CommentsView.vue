<template>
  <div class="aig-dataset-info-container" v-loading="loading">
    <h4 class="info-title">{{$t('data.dataset.comment.comment')}}</h4>
    <div>
      <el-row>
        <el-col class="comment-column" v-if="$store.state.user.authenticated">
          <NewComment :entity-id="entityId" @refresh-comment="fetchComments()" />
        </el-col>
        <el-col class="comment-column" v-for="(comment, index) in comments" v-bind:key="index">
          <Comment :show-reply-button="true" @refresh-comment="fetchComments()" :comment="comment" :is-owner="isOwner(comment.userId)"
          />
          <div v-if="comment.replies" v-for="(reply, index) in comment.replies" v-bind:key="index">
            <Comment :is-reply="true" :comment="reply" :is-owner="isOwner(reply.userId)" @refresh-comment="fetchComments()" />
          </div>
          <ReplyComment :entity-id="entityId" :parent-id="comment.id" @refresh-comment="fetchComments()" v-if="$store.state.user.authenticated"
          />
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
    fetchCommentsUrl: {
      required: true,
      type: String
    },
    entityId: {
      required: true,
      type: String
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
    fetchComments () {
      this.loading = true
      this.axios.get(this.fetchCommentsUrl).then(response => {
        this.comments = response.data.comments
        this.loading = false
      }).catch(e => {
        this.loading = false
      })
    },
    isOwner (userId) {
      return this.$store.state.user.profile.id === userId
    }
  },
  mounted () {
    this.fetchComments()
  }
}

</script>
<style lang="scss">
  .comment-column {
    margin-bottom: 45px;
    border: solid 1px #c8d0f1;
  }

  @media screen and (min-width: 100px) and (max-width: 680px) {
    .aig-dataset-info-container {
      padding: 0px 5px 0px 5px;
    }
  }

</style>
