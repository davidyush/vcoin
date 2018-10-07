<template>
  <table class='coins-table'>
    <thead>
      <tr>
        <th>Coin</th>
        <th>Market Cap</th>
        <th>Price</th>
        <th>Volume 24h</th>
        <th>Change 24h</th>
      </tr>
    </thead>
    <tbody>
      <tr
        class='row'
        v-for="coin in allCoins"
        :key="coin.id"
        @click="goTo(coin.symbol)"
        :class="[coin.changePercent24Hr > 0 ? 'change-up' : 'change-down']"
        >
        <td class='td-coin'>
          <span>{{ coin.rank }}.</span>
          <img class='icon-coin' :src="`https://static.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`" alt="">
          <span>
            {{coin.id}}
          </span>
        </td>
        <td>$ {{ shortPrice(coin.marketCapUsd) }}</td>
        <td>$ {{ Number(coin.priceUsd).toFixed(4) }}</td>
        <td>$ {{ shortPrice(coin.volumeUsd24Hr) }}</td>
        <td>{{ Number(coin.changePercent24Hr).toFixed(2) }} %</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from 'vuex';
import { shortPrice } from '../helpers/priceHelper';

export default {
  name: 'CoinsTable',
  computed: {
    ...mapGetters(['allCoins'])
  },
  methods: {
    shortPrice,
    goTo: function(coinShort) {
      this.$router.push({
        name: 'Coin',
        params: { coin: coinShort }
      });
    }
  }
}
</script>

<style lang="scss" scoped src='@/styles/coins_table.scss'/>


