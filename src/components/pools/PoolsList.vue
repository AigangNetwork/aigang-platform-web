<template>
  <Card class="guest-card portfolio-card">
    <div slot="body" v-loading="loading" :element-loading-text="$t('general.loading')">

      <table>
        <thead class="investments-table-header">
          <tr>
            <th>{{ $t('general.id') }}</th>
            <th>{{ $t('pools.portfolioInfo.insuranceType') }}</th>
            <th>{{ $t('pools.portfolioInfo.investors') }}</th>
            <th>{{ $t('pools.portfolioInfo.policies') }}</th>
            <th>{{ $t('pools.portfolioInfo.investedAmount') }}</th>
            <th>{{ $t('pools.portfolioInfo.amountPaid') }}</th>
            <th>{{ $t('pools.portfolioInfo.profit') }}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(investment, index) in investments" :key="index">
            <td> {{ investment.id | truncate(5)}} </td>
            <td> {{ investment.insuranceType }} </td>
            <td> {{ investment.investors }} </td>
            <td> {{ investment.policies }} </td>
            <td> {{ investment.invested }} {{ $t('general.aix') }}</td>
            <td> {{ investment.pool }} {{ $t('general.aix') }}</td>
            <td> {{ investment.profit }} {{ $t('general.aix') }}</td>
            <td>
              <!-- <el-button @click="alert('hello')" class="button">{{$t('data.dataset.comment.commentButton')}}</el-button> -->
              <span class="investment-list-item-status" :class="{ 'active': investment.status.toUpperCase() === 'ACTIVE',
                        'closed': investment.status.toUpperCase() === 'CLOSED'}">
                        {{ investment.status}}
              </span>
            </td>

          </tr>
        </tbody>
      </table>

    </div>
  </Card>
</template>
<script>
import Card from '@/components/Card'

export default {
  components: { Card },
  data () {
    return {
      loading: false,
      investments: [
        {
          id: 'fasdasdfaafdsfasdf',
          insuranceType: 'Android Device',
          investors: Math.floor((Math.random() * 1000)),
          policies: Math.floor((Math.random() * 100)),
          invested: 25,
          pool: Math.floor((Math.random() * 10000)),
          profit: Math.floor((Math.random() * 50)),
          status: 'Active',
          rate: 5.43
        },
        {
          id: 'fasdasdfaafdsfasdf',
          insuranceType: 'Android Device',
          investors: Math.floor((Math.random() * 1000)),
          policies: Math.floor((Math.random() * 100)),
          invested: 25,
          pool: Math.floor((Math.random() * 10000)),
          profit: Math.floor((Math.random() * 50)),
          status: 'Closed',
          rate: 5.43
        },
        {
          id: 'fasdasdfaafdsfasdf',
          insuranceType: 'Drones',
          investors: Math.floor((Math.random() * 1000)),
          policies: Math.floor((Math.random() * 100)),
          invested: 25,
          pool: Math.floor((Math.random() * 10000)),
          profit: Math.floor((Math.random() * 50)),
          status: 'Active',
          rate: 5.43
        },
        {
          id: 'fasdasdfaafdsfasdf',
          insuranceType: 'Other',
          investors: Math.floor((Math.random() * 1000)),
          policies: Math.floor((Math.random() * 100)),
          invested: 25,
          pool: Math.floor((Math.random() * 10000)),
          profit: Math.floor((Math.random() * 50)),
          status: 'Closed',
          rate: 5.43
        },
        {
          id: 'fasdasdfaafdsfasdf',
          insuranceType: 'Other',
          investors: Math.floor((Math.random() * 1000)),
          policies: Math.floor((Math.random() * 100)),
          invested: 25,
          pool: Math.floor((Math.random() * 10000)),
          profit: Math.floor((Math.random() * 50)),
          status: 'Active',
          rate: 5.43
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '~helpers/variables';

  .investments-list-title {
    padding-left: 23px;
  }

  .investment-list-item {
    border-top: 1px solid $button-purple;
    font-weight: 500;
    line-height: 1.14;
    letter-spacing: 0.7px;

    .text-medium {
      font-weight: 600;
    }
  }

  .investments-table-header {
    font-size: 12px;
    text-transform: uppercase;
    text-align: center;

    th {
      padding: 20px 15px 20px 0;
      font-weight: 400;
      text-align: center;

      &:first-child {
        padding-left: 15px;
      }

      &:last-child {
        min-width: 120px;

      }
    }
  }

  table {
    font-size: 14px;
    border-collapse: collapse;

    tr {
      border-top: 1px solid $gray;

      &:first-child {
        border-top: none;
        border-bottom: 1px solid $gray;
      }
    }

    td {
      padding: 10px 15px 10px 0;
      text-align: center;
      min-width: 100px;
      height: 40px;

      .button {
        margin-top: 0px;
      }

      &:first-child {
        padding-left: 15px;
      }

      &:hover {}
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
</style>
