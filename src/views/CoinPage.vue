<template>
  <div>
    <h1 v-if="coinInfo">#{{coinInfo.rank}} {{coinName}} ${{ Number(coinInfo.priceUsd).toFixed(5)}}</h1>
    <charts :coinId='coinName'/>
    <p>{{ coinInfo }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Charts from '../components/Charts'

export default {
  name: 'Coin',
  components: {
    Charts
  },
  computed: {
    ...mapGetters(['allCoins']),
    coinName() {
      return this.$route.params.coin;
    },
    coinInfo() {
      return this.allCoins.find(coin => coin.id === this.$route.params.coin);
    }
  }
}  
</script>

<style lang="scss" scoped src='@/styles/coin_page.scss'/>
