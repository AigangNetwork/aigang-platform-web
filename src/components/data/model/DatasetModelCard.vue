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
      <div class="card-section-left"></div>
      <div class="card-section-right">
        <span class="text-small">{{ $t('data.dataset.model.basePremium') }}</span>
        <span :class="{'text-big': isPremiumBig, 'text-big-medium': !isPremiumBig}">{{ model.premium }}</span>
        <span class="text-medium">{{ $t('data.dataset.model.eth') }} </span>
      </div>
    </div>
  </div>
</template>
<script>
import CreatedDate from '@/components/mixins/CreatedDate'

export default {
  props: ['model'],
  mixins: [CreatedDate],
  data () {
    return {
      modelRoute: `models/${this.model.id}`
    }
  },
  computed: {
    createdUtc () {
      return this.model.createdUtc
    },
    isPremiumBig () {
      return !(String(this.model.premium).length > 7)
    },
    voteCount () {
      if (this.model.voteCount > 1000) {
        return `+${this.model.voteCount / 1000}K`
      } else if (this.model.voteCount > 0) {
        return `+${this.model.voteCount}`
      } else {
        return '0'
      }
    },
    votesTooltipMessage () {
      return this.voteCount + ' ' + this.$t('data.dataset.model.usersVoted')
    }
  },
  methods: {
    navigateToModel () {
      this.$router.push(this.modelRoute)
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~helpers/variables';
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
      padding: 31px 34px;

      h3,
      p {
        max-width: 100%;
        word-wrap: break-word;
      }
    }

    .card-section:last-child {
      color: white;
      padding: 0;
      align-items: center;
      overflow: hidden;
      .card-section-right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        z-index: 2;
        background: $button-purple;
        padding: 0 34px 0 64px;
        height: 258px;
        width: 258px;
        margin-top: -30px;
        margin-bottom: -55px;
        margin-right: -45px;
        border-radius: 50%;

        span: {
          max-width: calc(100% - 55px);
          word-wrap: break-word;
        }
      }

      .text-small {
        text-align: left;
        width: 100%;
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
          .card-section-right {
            margin: 0 auto -55px auto;
            padding: 0 30px 0 30px;

            span {
              text-align: center;
            }
          }
        }
      }
    }
  }
</style>
