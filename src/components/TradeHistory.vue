<template>
  <table class='trade-history'>
    <thead>
      <tr>
        <th>Date</th>
        <th>Operation</th>
        <th>Coin Id</th>
        <th>Price</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="unit in trade" :key='unit._id'>
        <td>{{(new Date(unit.date)).toLocaleDateString()}}</td>
        <td>{{unit.operation}}</td>
        <td>{{unit.coinId}}</td>
        <td>${{unit.price % 1 === 0 ? unit.price : unit.price.toFixed(4)}}</td>
        <td>{{unit.amount % 1 === 0 ? unit.amount : unit.amount.toFixed(4)}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'TradeHistory',
  props: ['trade']
}
</script>

<style lang="scss" scoped src='@/styles/trade_history.scss'/>
