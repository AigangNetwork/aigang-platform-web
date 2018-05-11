<template>
  <div class="aig-upload-info">
    <div class="aig-upload-info-header">
      <img src="/static/upload/info24px.svg" alt="comment">
      <h5>{{$t('data.upload.titles.fileUploadPreferences')}}</h5>
    </div>
    <div class="aig-upload-info-body">
      <ul>
        <li>{{$t('data.upload.rules.rule0')}}</li>
        <li>{{$t('data.upload.rules.rule1')}}</li>
        <li>{{$t('data.upload.rules.rule3')}}</li>
        <li>{{$t('data.upload.rules.rule4')}}</li>
        <li>
          <router-link to="" @click.native="handleCsvInformaton">
            {{$t('data.upload.rules.rule5')}}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    handleCsvInformaton (event) {
      event.preventDefault()
      window.open('https://tools.ietf.org/html/rfc4180', '_blank')
    }
  }
}

</script>
<style lang="scss" scoped>
  @import '~helpers/variables';
  .aig-upload-info {
    height: 100%;
    max-height: 176px;
    margin-left: 10px;
    .aig-upload-info-header {
      display: flex;
      h5 {
        font-size: 12pt;
        margin: 4px 0px 5px 5px;
      }
    }
    .aig-upload-info-body {
      height: 100%;
      max-height: 180px;
      ul {
        margin-top: 0px;
        font-size: 12px;
        padding: 5px;
        list-style-type: none;
        li {
          margin: 3px 3px 5px 3px;
          a {
            &:hover {
              color: $orange;
            }
          }
        }
      }
    }
  }

</style>
