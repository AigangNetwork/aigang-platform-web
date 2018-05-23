<template>
  <div class="vote-container">
    <el-tooltip :content="votesTooltipMessage">
      <div class="vote-count">
        <transition name="slideUp" mode="out-in">
          <p :key="count">{{ voteCount }}</p>
        </transition>
      </div>
    </el-tooltip>
    <el-tooltip :disabled="$store.getters.isAuthenticated" :content="$t('data.dataset.model.votingDisabled')">
      <span class="wrapper el-button">
        <el-button :disabled="!$store.getters.isAuthenticated" class="vote-button" :class="{ 'active' : hasVoted, 'disabled': !$store.getters.isAuthenticated }"
          @click="vote">
          {{ $t('general.upvote') }}
        </el-button>
      </span>
    </el-tooltip>
  </div>
</template>

<script>
import VoteCount from '@/components/mixins/VoteCount'

export default {
  mixins: [VoteCount],
  data () {
    return {
      count: 0,
      hasVoted: false,
      showUnauthorizedVoting: false,
      votingDisabled: false
    }
  },
  methods: {
    async vote () {
      // Debouncing api  requests
      if (this.votingDisabled) return

      if (!this.canVote) {
        this.showUnauthorizedVoting = true
        setTimeout(() => { this.showUnauthorizedVoting = false }, 2000)
        return
      } else {
        this.showUnauthorizedVoting = false
      }

      if (this.hasVoted) {
        try {
          this.count--
          this.hasVoted = false
          this.votingDisabled = true

          await this.axios.delete(`/vote/model/${this.$route.params.modelId}`)
          this.votingDisabled = false
        } catch (e) {
          this.hasVoted = false
          this.count++
        }
      } else {
        try {
          this.count++
          this.hasVoted = true
          this.votingDisabled = true

          await this.axios.post(`/vote/model/${this.$route.params.modelId}`)
          this.votingDisabled = false
        } catch (e) {
          this.hasVoted = false
        }
      }
    },
    async fetchVotesCount () {
      try {
        const response = await this.axios.get(`/vote/model/count/${this.$route.params.modelId}`)
        this.count = response.data.count
      } catch (e) {
        this.count = 0
      }
    },
    async fetchHasUserVoted () {
      try {
        const response = await this.axios.get(`/vote/model/uservoted/${this.$route.params.modelId}`)
        this.hasVoted = response.data.hasUserVoted
      } catch (e) {
        this.hasVoted = false
      }
    }
  },
  computed: {
    canVote () {
      return this.$store.getters.dataset &&
          this.$store.getters.dataset.state === 'active' &&
          this.$store.getters.isAuthenticated
    }
  },
  mounted () {
    this.fetchVotesCount()

    if (this.canVote) {
      this.fetchHasUserVoted()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~helpers/variables';

  .vote-container {
    display: flex;
    margin-left: auto;
    max-width: 152px;

    .vote-count {
      width: 64px;
      height: 48px;
      background: $dark-orange;
      margin-left: auto;

      p {
        line-height: 48px;
        text-align: center;
        font-family: $font-secondary;
        color: white;
        font-size: 16px;
        margin: 0;
      }
    }

    .vote-button {
      background: white;
      border: none;
      border-radius: 0;
      color: $yellow;
      border: 1px solid $light-yellow;

      &.active {
        background: $light-yellow;
        color: white;
      }

      &:hover {
        background: $light-yellow;
        color: white
      }

      &.disabled {
        color: #c0c4cc;
        border-color: #ebeef5;
      }

      &.disabled:hover {
        background: white;
        color: #c0c4cc;
      }
    }
  }

  @media screen and (max-width: 765px) and (min-width: 100px) {
    .vote-container {
      margin: 0 auto;
      max-width: 132px;

      .vote-count {
        margin: 0 auto;
        width: 44px;
        height: 38px;

        p {
          line-height: 38px;
          text-align: center;
          font-family: $font-secondary;
          color: white;
          font-size: 14px;
          margin: 0;
        }
      }

      .vote-button {
        height: 38px;
      }
    }
  }
</style>
