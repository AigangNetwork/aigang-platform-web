<template>
  <div class="user-comment-container">
    <UserInfo :show-username="true" :user-name="$store.state.user.profile.userName" />
    <el-form :rules="commentFormRules" class="comment-form" :model="commentForm" ref="commentForm">
      <el-form-item prop="text">
        <el-input type="textarea" :placeholder="$t('data.dataset.threads.commentPlaceholder')" v-model="commentForm.text"></el-input>
      </el-form-item>
      <el-form-item class="button-container">
        <el-button @click="submitForm('commentForm', submitComment)" class="button">{{$t('data.dataset.threads.postButton')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import UserInfo from '@/components/comments/UserInfo.vue'
import FormMixin from '@/components/mixins/FormMixin'
export default {
  components: {
    UserInfo
  },
  mixins: [FormMixin],
  data () {
    return {
      commentForm: {
        text: '',
        parentId: null,
        entityId: null
      },
      commentFormRules: {
        text: [{
          required: true,
          message: this.$t('data.dataset.threads.validation.commentFieldRequired'),
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    submitComment () {
      this.axios.post('/comment', this.commentForm).then(response => {
        this.$notify.success({
          title: this.$t('data.upload.notifications.titles.success'),
          message: this.$t('data.dataset.threads.successFullPost')
        })
        this.$router.go(this.$router.currentRoute)
      })
    }
  },
  created () {
    this.commentForm.entityId = this.$route.params.id
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
