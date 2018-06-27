<template>

  <el-row class="profile-email-container">
    <el-col>
      <p class="input-section-title">{{ $t('profile.profile.emailPreferences') }}</p>
    </el-col>
    <el-col>
      <p class="profile-section-decription">{{ $t('profile.profile.emailDescription') }}</p>
    </el-col>

    <el-form class="form-container" @keyup.enter.native.prevent>

      <el-row>
        <el-col>
          <el-form-item prop="emailPreferences.isModelCommentsEnabled">
            <el-checkbox fill="blue" class="aig-checkbox" :label="$t('profile.profile.emailModelComments' )" model="emailPreferences.isModelCommentsEnabled"></el-checkbox>
            <p class="checkbox-description">{{ $t('profile.profile.emailModelCommentsDescription') }}</p>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-form-item prop="emailPreferences.isDataSetCommentsEnabled">
            <el-checkbox fill="blue" class="aig-checkbox" :label="$t('profile.profile.emailDataSetsComments' )" model="emailPreferences.isDataSetCommentsEnabled"></el-checkbox>
            <p class="checkbox-description">{{ $t('profile.profile.emailDataSetsCommentsDescription') }}</p>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-form-item prop="emailPreferences.isNewDataCommentsEnabled">
            <el-checkbox fill="blue" class="aig-checkbox" :label="$t('profile.profile.emailNewDataComments' )" model="emailPreferences.isNewDataCommentsEnabled"></el-checkbox>
            <p class="checkbox-description">{{ $t('profile.profile.emailNewDataCommentsDescription') }}</p>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-form-item prop="emailPreferences.isNewsEnabled">
            <el-checkbox fill="blue" class="aig-checkbox" :label="$t('profile.profile.emailNews' )" model="emailPreferences.isNewsEnabled"></el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
  </el-row>
</template>

<script>
export default {
}
</script>
<style lang="scss">
  .profile-email-container .form-container {
    max-width: 566px;
  }
</style>
