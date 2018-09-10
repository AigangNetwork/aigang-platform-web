<template>
  <div>
    <InvestmentProductItem v-for="investmentProduct in products" :key="investmentProduct.id" :product="investmentProduct" />
  </div>
</template>
<script>
import InvestmentProductItem from '@/components/investment/InvestmentProductItem'

export default {
  components: { InvestmentProductItem },
  data () {
    return {
      loading: false,
      products: [
        {
          id: Math.floor(Math.random() * 100000),
          title: 'Android Battery Insurance',
          investedCount: Math.floor(Math.random() * 100),
          poolSize: Math.floor(Math.random() * 14200),
          currentPoolSize: Math.floor(Math.random() * 1420),
          predictedProfit: Math.floor(Math.random() * 100),
          status: 'Active'
        },
        {
          id: Math.floor(Math.random() * 100000),
          title: 'Drone Insurance',
          investedCount: Math.floor(Math.random() * 100),
          poolSize: Math.floor(Math.random() * 14200),
          currentPoolSize: Math.floor(Math.random() * 1420),
          predictedProfit: Math.floor(Math.random() * 100),
          status: 'Active'
        },
        {
          id: Math.floor(Math.random() * 100000),
          title: 'Android Device Insurance',
          investedCount: Math.floor(Math.random() * 100),
          poolSize: Math.floor(Math.random() * 14200),
          currentPoolSize: Math.floor(Math.random() * 1420),
          predictedProfit: Math.floor(Math.random() * 100),
          status: 'Closed'
        },
        {
          id: Math.floor(Math.random() * 100000),
          title: 'Tesla Battery Insurance',
          investedCount: Math.floor(Math.random() * 100),
          poolSize: Math.floor(Math.random() * 14200),
          currentPoolSize: Math.floor(Math.random() * 1420),
          predictedProfit: Math.floor(Math.random() * 100),
          status: 'Active'
        }
      ]
    }
  }
}</script>
<style lang="scss" scoped></style>
