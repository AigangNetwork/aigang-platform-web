<template>
  <div class="user-comment-container" :class="{ 'reply-padding': isReply}">
    <div class="comment-header" style="display: flex; justify-content: space-between;">
      <UserInfo :date="comment.createdUtc" :show-username="true" :user-name="comment.username" />
      <div class="icon-container" v-if="isOwner">
        <el-tooltip :content="$t('data.dataset.comment.editTooltip')">
          <img @click="editComment" class="comment-icon-left" src="/static/dataset/edit_black24px.png" alt="">
        </el-tooltip>
        <el-tooltip :content="$t('data.dataset.comment.removeTooltip')">
          <img @click="dialogVisible = true" class="comment-icon" src="/static/dataset/trash_black24px.png" alt="">
        </el-tooltip>
      </div>
    </div>
    <div class="comment-content" :source="comment.text">
      <div v-if="isOnEdit" v-loading="loading" :element-loading-text="$t('general.updating')">
        <el-form :rules="commentFormRules" class="comment-form" :model="updateCommentForm" ref="updateCommentForm">
          <el-form-item prop="text">
            <el-input type="textarea" :placeholder="$t('data.dataset.comment.commentPlaceholder')" v-model="updateCommentForm.text"></el-input>
          </el-form-item>
          <el-form-item class="button-container">
            <el-button @click="cancelEdit()" class="button">{{$t('general.cancel')}}</el-button>
            <el-button @click="submitForm('updateCommentForm', updateComment)" class="button">{{$t('data.dataset.comment.update')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-else>
        {{comment.text}}
      </div>
    </div>
    <div class="comment-footer">
      <span class="replies" v-if="comment.replies">
        {{ comment.replies.length }} {{$t('data.dataset.comment.replies')}}
      </span>
    </div>
    <Dialog :title="$t('profile.warning')" :body="$t('data.dataset.comment.deleteCommentDialogContent')" :on-confirm="deleteComment"
      :is-visible="dialogVisible" :on-cancel="cancelDelete" />
  </div>
</template>
<script>
import UserInfo from '@/components/comments/UserInfo.vue'
import Comment from '@/components/comments/Comment.vue'
import FormMixin from '@/components/mixins/FormMixin'
import Dialog from '@/components/common/Dialog'
export default {
  props: {
    comment: {
      required: true
    },
    isReply: {
      type: Boolean
    },
    isOwner: {
      type: Boolean,
      required: true
    }
  },
  components: {
    UserInfo,
    Comment,
    Dialog
  },
  mixins: [FormMixin],
  data () {
    return {
      isOnEdit: false,
      loading: false,
      dialogVisible: false,
      updateCommentForm: {
        commentId: null,
        text: null
      },
      commentFormRules: {
        text: [{
          required: true,
          message: this.$t('data.dataset.comment.validation.commentFieldRequired'),
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    editComment () {
      if (!this.isOnEdit && this.isOwner) {
        this.isOnEdit = true
      }
    },
    updateComment () {
      this.loading = true
      this.axios.put('/comment', this.updateCommentForm).then(response => {
        this.$notify.success({
          title: this.$t('data.upload.notifications.titles.success'),
          message: this.$t('data.dataset.comment.successFullUpdate')
        })
        this.isOnEdit = false
        this.loading = false
        this.$emit('refresh-comment')
      }).catch(e => {
        this.loading = false
      })
    },
    cancelEdit () {
      this.isOnEdit = false
      this.updateCommentForm.text = this.comment.text
    },
    deleteComment () {
      if (this.isOwner) {
        this.axios.delete('/comment/' + this.comment.id).then(response => {
          this.$notify.success({
            title: this.$t('data.upload.notifications.titles.success'),
            message: this.$t('data.dataset.comment.successFullDelete')
          })
          this.dialogVisible = false
          this.$emit('refresh-comment')
        })
      }
    },
    cancelDelete () {
      this.dialogVisible = false
    }
  },
  created () {
    this.updateCommentForm.commentId = this.comment.id
    this.updateCommentForm.text = this.comment.text
  }
}

</script>
<style lang="scss">
  @import '~helpers/variables';
  .user-comment-container {
    border: solid 1px #f2f2f2;
    padding: 10px;
    .comment-header {
      .icon-container {
        display: flex;
        .comment-icon {
          height: 19px;
        }
        .comment-icon-left {
          height: 19px;
          margin-right: 10px;
        }
      }
    }
    .comment-content {
      padding: 10px 0px 2px 15px;
      font-size: 10pt;
      .comment-form {
        align-items: center;
        width: 100%;
        .button-container {
          margin-top: 6px;
          display: flex;
          justify-content: flex-end;
          .button {
            height: 30px;
            width: 99px;
            padding: 0px;
          }
        }
        .el-form-item {
          margin-bottom: 0px;
        }
      }
    }
    .comment-footer {
      display: flex;
      justify-content: right;
      font-size: 9pt;
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
