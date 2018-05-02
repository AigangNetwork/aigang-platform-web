<template>
  <div class="user-comment-container" :class="{ 'reply-padding': isReply}">
    <UserInfo :date="comment.createdUtc" :show-username="true" :user-name="comment.username" />
    <div class="comment-content" :source="comment.text">
      {{comment.text}}
    </div>
    <div class="comment-footer">
      <div>
        <div v-if="comment.replies">
          <span class="replies">
            {{ comment.replies.length }} {{$t('data.dataset.threads.replies')}}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import UserInfo from '@/components/comments/UserInfo.vue'
import Comment from '@/components/comments/Comment.vue'

export default {
  props: {
    comment: {
      required: true
    },
    isReply: {
      type: Boolean
    }
  },
  components: {
    UserInfo,
    Comment
  }
}

</script>
<style lang="scss">
  @import '~helpers/variables';
  .user-comment-container {
    border: solid 1px #c8d0f1;
    padding: 15px;
    .comment-content {
      padding: 15px;
    }
    .comment-footer {
      display: flex;
      justify-content: space-between;
      .button {
        height: 30px;
        width: 99px;
        padding: 0px;
      }
      .replies {
        color: $purple;
        font-weight: bold;
      }
    }
  }

  .reply-padding {
    padding-left: 40px;
  }

</style>
