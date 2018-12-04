<template>
  <div class="aig-container">
    <div id="reddit-widget"></div>
  </div>
</template>

<script>
export default {
  beforeMount () {
    // Reddit lazy load hack
    let oScript = document.createElement('script')

    document.write = (text) => {
      const updatedLinks = text.replace(/href=/g, 'target="_blank" href=')

      document.getElementById('reddit-widget').innerHTML += updatedLinks
    }

    oScript.src = 'https://www.reddit.com/r/AigangNetwork.embed?limit=20'
    document.body.appendChild(oScript)
  }
}
</script>

<style lang="scss" scoped>
  @import '~helpers/variables';

  #reddit-widget{
    margin: 40px 0;
  }

</style>
