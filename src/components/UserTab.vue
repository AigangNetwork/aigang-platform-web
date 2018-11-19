<template>
  <router-link to="/profile" active-class="aig-bar-active" class="aig-profile" exact>
    <div class="photo">

      {{ $store.state.user.profile.firstName.charAt(0) }}
  </div>
    <div class="information">
      {{ $store.state.user.profile.firstName }}
      <div v-if="$store.getters['user/isWeb3Enabled']" class="balance">
        {{ $store.getters['user/aixBalance'] }} AIX
      </div>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
  @import '~helpers/variables';
  @import '~helpers/mixins';

  .aig-profile {
    float: right;
    font-weight: normal;
    height: 100%;
    flex-wrap: nowrap;
    display: flex;
    font-size: 11px;
    font-family: $font-primary;
    font-weight: 500;
    text-align: right;
    align-items: center;
    width: 100%;

    .photo {
      // pointer-events: none;
      flex-shrink: 0;
      height: 46px;
      width: 46px;
      border-radius: 50%;
      margin-left: 7px;
      background: #f3f0f0cc;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin-right: 17px;
    }

    .information {
      color: $white;
      margin-right: 10px;
      max-width: calc(100% - 70px);
      word-wrap: break-word;

      .balance {
        flex-basis: 100%;
        margin-top: 2px;
        color: $gray;
        font-family: $font-secondary;
      }
    }
  }
</style>
