<template>
  <div class="model-item-card">
    <div class="card-section">
      <el-tooltip :content="votesTooltipMessage">
        <div class="vote-count">
          {{ voteCount }}
        </div>
      </el-tooltip>
      <h3>
        <router-link :to="modelRoute">{{ model.title | truncate(50) }}</router-link>
      </h3>
      <p> {{ model.description | truncate(60) }}</p>
      <div class="model-item-card-footer">
        <el-col>{{ $t('data.dataset.model.by') }}
          <span class="author">{{ model.userName }}</span> &#8226; {{ created }}</el-col>
      </div>
    </div>

    <div class="card-section">
      <div class="card-section-right">
        <span class="bubble-title">{{ $t('data.dataset.model.basePremium') }}</span>
        <span :class="{'text-big': isPremiumBig, 'text-big-medium': !isPremiumBig}">{{ model.premium }} {{ $t('data.dataset.model.aix') }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import CreatedDate from '@/components/mixins/CreatedDate'
import VoteCount from '@/components/mixins/VoteCount'

export default {
  props: ['model'],
  mixins: [CreatedDate, VoteCount],
  data () {
    return {
      modelRoute: `models/${this.model.id}`,
      count: 0
    }
  },
  computed: {
    createdUtc () {
      return this.model.createdUtc
    },
    isPremiumBig () {
      return !(String(this.model.premium).length > 7)
    }
  },
  methods: {
    navigateToModel () {
      this.$router.push(this.modelRoute)
    }
  },
  mounted () {
    this.count = this.model.voteCount
  }
}
</script>
<style lang="scss" scoped>
  @import '~helpers/variables';

  $purple-circle-size: 256px;

  .model-item-card {
    background: $pastel-gray;
    font-family: $font-secondary;
    width: 100%;
    border: 1px solid $light-border-blue;
    margin: 16px 0;
    display: flex;
    justify-content: space-between;

    p {
      font-size: 14px;
      line-height: 1.29;
      letter-spacing: 0.5px;
      color: $light-grey;
      margin: 8px 0;
    }

    h3 {
      margin: 0;
    }

    .model-item-card-footer {
      font-size: 14px;
      margin: 12px 0 20px 0;
    }

    .card-section {
      max-width: 65%;
      h3,
      p {
        max-width: 100%;
        word-wrap: break-word;
      }
      &:last-child {
        width: $purple-circle-size;
        color: white;
        padding: 0;
        align-items: center;
        overflow: hidden;
        .card-section-right {
          position: relative;
          &:before {
            background: $button-purple;
            width: 100%;
            height: 140%;
            content: '';
            border-radius: 50% 0 0 50%;
            position: absolute;
            box-shadow: 0 6px 20px 1px rgba(118, 183, 250, 0.5);
          }
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 40px 0 34px;
          height: 100%;
          width: 100%;
          > span {
            z-index: 1;
            word-wrap: break-word;
            margin-left: 5px;
            text-align: right;
            &.bubble-title {
              font-family: 'Roboto', sans-serif;
              font-size: 8px;
              font-weight: bold;
              font-style: normal;
              font-stretch: normal;
              line-height: normal;
              letter-spacing: 0.4px;
              text-transform: uppercase;
              color: #d3d7e5;
            }
            &.text-big-medium {
              width: auto;
            }
          }
        }
      }
    }

    .author {
      color: $button-purple;
      max-width: 100%;
      word-wrap: break-word;
    }

    .vote-count {
      color: white;
      background: $green;
      font-size: 14px;
      font-weight: 400;
      padding: 8px 12px;
      border-radius: 16px;
      height: 32px;
      width: 63px;
      text-align: center;
      margin-bottom: 12px;
    }
  }

  @media screen and (min-width: 280px) and (max-width: 582px) {
    .model-item-card {
      flex-direction: column;

      .card-section {
        max-width: 100%;
        &:last-child {
          width: 100%;
          .card-section-right {
            position: relative;
            &:before {
              background: $button-purple;
              width: 100%;
              height: 100%;
              margin-top: 5px;
              content: '';
              border-radius: 50%;
              position: absolute;
              box-shadow: 0 6px 20px 1px rgba(118, 183, 250, 0.5);
            }
            justify-content: center;
            margin: 0 auto -60px auto;
            padding: 0px;
            width: $purple-circle-size;
            height: $purple-circle-size;
            > span {
              z-index: 1;
              word-wrap: break-word;
              text-align: center;
            }
          }
        }
      }
    }
  }
</style>
