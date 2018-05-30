<template>
  <div class="user-comment-container" v-loading="loading">
    <UserInfo :show-username="true" :user-name="$store.state.user.profile.userName" />
    <el-form :rules="commentFormRules" class="comment-form" :model="commentForm" ref="commentForm">
      <el-form-item prop="text">
        <el-input type="textarea" :placeholder="$t('data.dataset.comment.commentPlaceholder')" v-model="commentForm.text"></el-input>
      </el-form-item>
      <el-form-item class="button-container">
        <el-button @click="submitForm('commentForm', submitComment)" class="button">{{$t('data.dataset.comment.postButton')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import UserInfo from '@/components/comments/UserInfo.vue'
import FormMixin from '@/components/mixins/FormMixin'
import eventHub from '@/utils/eventHub'
export default {
  props: {
    entityId: {
      required: true,
      type: String
    },
    updateEvent: {
      required: true,
      type: String
    }
  },
  components: {
    UserInfo
  },
  mixins: [FormMixin],
  data () {
    return {
      loading: false,
      commentForm: {
        text: '',
        parentId: null,
        entityId: null
      },
      commentFormRules: {
        text: [{
          required: true,
          message: this.$t('data.dataset.comment.validation.commentFieldRequired'),
          trigger: 'blur'
        },
        {
          max: 1000,
          message: this.$t('data.dataset.comment.validation.commentTooLong'),
          trigger: 'blur'
        }
        ]
      }
    }
  },
  methods: {
    submitComment () {
      this.loading = true
      this.axios.post('/comment', this.commentForm).then(response => {
        this.loading = false
        this.$notify.success({
          title: this.$t('data.upload.notifications.titles.success'),
          message: this.$t('data.dataset.comment.successFullPost')
        })

        this.commentForm.text = null
        this.$emit('refresh-comment')
        eventHub.$emit(this.updateEvent, 1)
      })
    }
  },
  created () {
    this.commentForm.entityId = this.entityId
  }
}

</script>
<style lang="scss">
  @import '~helpers/variables';
  .user-comment-container {
    border: solid 1px #c8d0f1;
    padding: 15px;
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
</style>
