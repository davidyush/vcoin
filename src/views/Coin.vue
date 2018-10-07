<template>
  <div>
    <h1>{{coinName}}</h1>
    <p>{{getCoinInfo}}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Coin',
  computed: {
    ...mapGetters(['allCoins']),
    coinName() {
      return this.$route.params.coin;
    },
    getCoinInfo() {
      return this.allCoins.filter(coin => coin.symbol === this.$route.params.coin);
    }
  }
}  
</script>