<template>
  <div class="aig-container" v-loading="loading">
    <div>
      <div class="buttons" v-if="isDataLoaded">
        <a href="https://www.reddit.com/r/AigangNetwork/submit" target="_blank" class="el-button button el-button--primary">{{ $t('discussions.buttons.create') }}</a>
        <a href="https://www.reddit.com/r/AigangNetwork" target="_blank" class="el-button button el-button--primary">{{ $t('discussions.buttons.all') }}</a>
      </div>
      <div id="reddit-widget"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      isDataLoaded: false
    }
  },

  beforeMount () {
    // Reddit lazy load hack
    let oScript = document.createElement('script')

    document.write = (text) => {
      const updatedLinks = text.replace(/href=/g, 'target="_blank" href=')

      document.getElementById('reddit-widget').innerHTML += updatedLinks
      this.loading = false
      this.isDataLoaded = true
    }

    oScript.src = 'https://www.reddit.com/r/AigangNetwork.embed?limit=20'

    document.body.appendChild(oScript)
  }
}
</script>

<style lang="scss" scoped>
  @import '~helpers/variables';

  .buttons {
    margin-top: 25px;
    display: flex;

    .button {
      height: 40px;
    }
  }

  #reddit-widget{
    clear: both;
    margin: 25px 0px 40px 0px;
  }

</style>
