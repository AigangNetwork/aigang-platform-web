<template>
  <transition name="list" mode="out-in" appear>
    <tr @click="navigateToContribution(contribution.id, contribution.poolContractAddress)" v-if="contribution && contribution.id">
      <td class="title">{{ contribution.title }}</td>
      <td class="number">{{ contribution.amount}} {{ $t('general.aix') }}</td>
      <td class="number">
        <Date :dateUtc="contribution.createdUtc" format="YYYY-MM-DD HH:mm" />
      </td>
      <td>
        <PoolContributionLabel :type="contribution.status" size="small" />
      </td>
    </tr>

    <tr class="placeholder-container"  v-else>
      <td class="title">
        <PlaceholderBar class="placeholder" />
      </td>
      <td class="number">
        <PlaceholderBar class="placeholder" />
      </td>
      <td class="number">
        <PlaceholderBar class="placeholder" />
      </td>
      <td>
        <PlaceholderBar />
      </td>
    </tr>
  </transition>
</template>

<script>
import PoolContributionLabel from './PoolContributionLabel'
import Date from '@/components/Date'
import PlaceholderBar from '@/components/common/PlaceholderBar'

export default {
  props: ['contribution'],
  components: { PoolContributionLabel, Date, PlaceholderBar },
  methods: {
    navigateToContribution (id, address) {
      this.$router.push({
        name: 'PoolContribution',
        params: { id, address }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~helpers/variables';

  tr {
    border-top: 1px solid $gray;
    cursor: pointer;

    &:hover {
      background-color: $light-transparent-grey;
    }

    &.placeholder-container {
      td {
        max-width: 100px;
      }

      .placeholder {
        margin-top: 2px;
        margin-bottom: 2px;
      }
    }

    td {
      padding: 10px 5px 10px 0;
      text-align: center;
      min-width: 100px;
      height: 40px;
      max-width: 25%;

      &.number {
        font-family: $font-secondary;
        letter-spacing: 0.5px;
      }

      &.title {
        text-align: left;
        font-weight: 500;
      }

      .button {
        margin-top: 0px;
      }

      &:first-child {
        padding-left: 15px;
      }
    }
  }

  .investment-list-item-status {
    border: 1px dashed $button-purple;
    padding: 5px 10px;
    min-width: 80px;
    display: inline-block;
    text-transform: uppercase;
  }

  @media screen and (max-width: 680px) and (min-width: 100px) {
    tr {
      td {
        &.title, h2 {
          font-size: 10pt !important;
        }
      }
    }
  }
</style>
