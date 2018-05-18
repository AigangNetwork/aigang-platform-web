<template>
  <div class="vote-container">
    <div class="vote-count">
      <transition name="slideUp" mode="out-in">
        <el-tooltip :content="votesTooltipMessage">
          <p :key="count">{{ count }}</p>
        </el-tooltip>
      </transition>
    </div>
    <el-tooltip :content="$t('data.dataset.model.unauthorizedVoting')" :value="showUnauthorizedVoting" :manual="true">
      <el-button class="vote-button" :class="{ 'active' : hasVoted }" @click="vote">
        {{ $t('general.upvote') }}
      </el-button>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  data () {
    return {
      voteCount: 0,
      hasVoted: false,
      canVote: false,
      showUnauthorizedVoting: false,
      votingDisabled: false
    }
  },
  computed: {
    count () {
      if (this.voteCount > 1000) {
        return '+' + (this.voteCount % 1000) + 'K'
      } else if (this.voteCount > 0) {
        return '+' + this.voteCount
      } else {
        return '0'
      }
    },
    votesTooltipMessage () {
      return this.voteCount + ' ' + this.$t('data.dataset.model.usersVoted')
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
          this.voteCount--
          this.hasVoted = false
          this.votingDisabled = true

          await this.axios.delete(`/vote/model/${this.$route.params.modelId}`)
          this.votingDisabled = false
        } catch (e) {
          this.hasVoted = false
          this.voteCOunt++
        }
      } else {
        try {
          this.voteCount++
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
        this.voteCount = response.data.count
      } catch (e) {
        this.voteCount = 0
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
  mounted () {
    this.fetchVotesCount()

    this.canVote = this.$store.getters.dataset.state === 'active' && this.$store.getters.isAuthenticated

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
