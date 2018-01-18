<template>
  <div class="aig__app" v-loading="loading" element-loading-background="rgba(255, 255, 255, 1)" element-loading-text="Mounting application...">
    <Navigation/>
    <router-view class="aig__view"/>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'

export default {
  name: 'App',
  components: {
    Navigation
  },
  data () {
    return {
      loading: true
    }
  },
  mounted () {
    setTimeout(() => {
      this.loading = false
      this.$message({
        message: 'Application successfully mounted',
        type: 'success'
      })
    }, 1000)
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Saira+Semi+Condensed:300,400,500,600|Ubuntu:300,300i,400,400i,500,500i,700,700i');

@import '~helpers/reset';
@import '~helpers/variables';

.line.el-col {
  text-align: center;
}

.el-message {
  font-family: $font-primary;
  .el-message__content {
    font-size: 12px;
  }
}

.el-tooltip__popper {
  font-family: $font-primary;
  font-size: 12px;
  font-weight: 300;
}

.el-loading-spinner {
  .path {
    stroke: $purple;
  }
  .el-loading-text {
    color: darken($gray, 25);
  }
}

.el-dialog__headerbtn:focus,
.el-dialog__close,
.el-dialog__headerbtn:hover .el-dialog__close {
  color: $purple;
}

.el-button {
  border: 0;
  color: darken($gray, 25);
  &:hover,
  &:focus {
    color: $purple;
    border-color: $purple;
    background-color: rgba($purple, .1);
  }
}


.el-button--primary {
  background: $purple;
  color: white;
  &:hover {
    color: white;
    background: lighten($purple, 5);
  }
  &:active {
    background: darken($purple, 5);
  }
  &:focus {
    background: $purple;
  }
}
.el-button--primary:focus, .el-button--primary:hover

.el-switch.is-checked {
  .el-switch__core {
    background: lighten($purple, 5);
    border-color: $purple;
  }
}

.el-textarea__inner,
.el-input__inner {
  &:focus {
    border-color: $purple;
  }
}

.v-modal {
  background: $purple;
  opacity: .9;
}

.el-dialog {
  box-shadow: 0 0 41px 0 rgba(darken($gray, 50),.12);
}

.aig__app {
  padding-left: 250px;
  font-size: 13px;
  background: $gray;
  position: relative;
  font-family: $font-primary;
  width: 100%;
  font-size: 14px;
  line-height: 1;
  display: flex;
  align-items: column;
  .aig__navigation {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
}

.aig__view {
  width: 100%;
  min-height: 100vh;
  height: auto;
  padding: 60px;
  .aig__view__head {
    &+.aig__view__body {
      margin-top: 40px;
    }
  }
  .aig__view__title {
    font-size: 28px;
    font-weight: 500;
    font-family: $font-secondary;
  }
}

p {
  line-height: 1.55;
}
</style>
