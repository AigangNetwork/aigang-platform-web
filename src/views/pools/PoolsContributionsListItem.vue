<template>
  <tr @click="navigateToContribution(contribution.id)">
    <td class="title">{{ contribution.poolName }}</td>
    <td>{{ contribution.investors }}</td>
    <td>{{ contribution.amount}} {{ $t('general.aix') }}</td>
    <td>{{ contribution.investedAmount }} {{ $t('general.aix') }}</td>
    <td>{{ contribution.poolGoalAmount }} {{ $t('general.aix') }}</td>
    <td>
      <PoolContributionLabel :type="contribution.status" size="small" />
    </td>
  </tr>
</template>

<script>
import PoolContributionLabel from './PoolContributionLabel'

export default {
  props: ['contribution'],
  components: {
    PoolContributionLabel
  },
  methods: {
    navigateToContribution (id) {
      this.$router.push({
        name: 'PoolContribution',
        params: { id }
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
      background: $light-transparent-grey;
    }

    td {
      padding: 10px 5px 10px 0;
      text-align: center;
      min-width: 100px;
      height: 40px;

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

    &.active {
      color: $button-purple;
    }

    &.closed {
      border: 1px dashed $gray;
      color: $gray;
    }
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
