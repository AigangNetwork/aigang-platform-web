<template>
  <div class="reply-comment" v-loading="loading">
    <UserInfo :show-username="false" :user-name="$store.state.user.profile.userName" />
    <el-form @submit.prevent.native="onEnter" :rules="replyFormRules" class="reply-form" :model="replyFrom" ref="replyFrom">
      <el-form-item class="input-form-item" prop="text">
        <el-input class="input" :placeholder="$t('data.dataset.comment.commentPlaceholder')" :disabled="loading" v-model="replyFrom.text"></el-input>
      </el-form-item>
      <el-form-item class="button-container">
        <el-button @click="submitForm('replyFrom', submitReply)" class="button">{{$t('data.dataset.comment.commentButton')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import UserInfo from '@/components/comments/UserInfo.vue'
import FormMixin from '@/components/mixins/FormMixin'
import eventHub from '@/utils/eventHub'
export default {
  components: {
    UserInfo
  },
  mixins: [FormMixin],
  props: {
    parentId: {
      required: true,
      type: String
    },
    entityId: {
      required: true,
      type: String
    },
    updateEvent: {
      required: true,
      type: String
    }
  },
  methods: {
    submitReply () {
      this.loading = true
      this.axios.post('/comment', this.replyFrom).then(response => {
        this.loading = false
        this.$notify.success({
          title: this.$t('data.upload.notifications.titles.success'),
          message: this.$t('data.dataset.comment.successFullPost')
        })
        this.replyFrom.text = null
        eventHub.$emit(this.updateEvent, 1)
        this.$emit('refresh-comment')
      })
    },
    onEnter () {
      if (!this.loading && this.replyFrom && this.replyFrom.text) {
        this.submitReply()
      }
    }
  },
  data () {
    return {
      loading: false,
      replyFrom: {
        entityId: null,
        parentId: null,
        text: null
      },
      replyFormRules: {
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
  created () {
    this.replyFrom.parentId = this.parentId
    this.replyFrom.entityId = this.entityId
  }
}

</script>
<style lang="scss">
  .reply-comment {
    border: solid 1px #c8d0f1;
    padding: 10px 10px 0px 40px;
    display: flex;
    .reply-form {
      font-size: 10pt;
      display: flex;
      width: 100%;
      .input-form-item {
        width: 100%;
        .input {
          input {
            height: 30px;
          }
        }
      }
      .button-container {
        display: flex;
        justify-content: flex-end;
        .button {
          height: 30px;
          width: 99px;
          padding: 0px;
          margin-left: 10px;
        }
      }
    }
  }
</style>
