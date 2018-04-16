<template>
  <div class="model-item-card">
    <div class="card-section">
      <h3>
        <router-link :to="modelRoute">{{ model.title }}</router-link>
      </h3>
      <p> {{ model.description }}</p>
      <div class="model-item-card-footer">
        <el-col>{{ $t('data.dataset.model.by') }}
          <span class="author">{{ model.firstName }} {{ model.lastName }}</span> &#8226; {{ created }}</el-col>
      </div>
    </div>

    <div class="card-section">
      <div class="card-section-left"></div>
      <div class="card-section-right">
        <span class="small-text">{{ $t('data.dataset.model.basePremium') }}</span>
        <span>
          <span class="text-big">{{ model.premium }}</span>
          <span class="text-medium">{{ $t('data.dataset.model.eth') }} </span>
        </span>
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
      height: 26px;
    }

    .model-item-card-footer {
      font-size: 14px;
      margin: 12px 0 20px 0;
    }

    .card-section {
      padding: 31px 34px;
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
        height: 150%;
        margin-top: -17%;
        border-top-left-radius: 50%;
        border-bottom-left-radius: 50%;
      }

    }

    .author {
      color: $button-purple;
    }
  }
</style>
