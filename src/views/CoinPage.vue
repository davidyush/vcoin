<template>
  <div>
    <h1 v-if="coinInfo">#{{coinInfo.rank}} {{coinName}} ${{coinInfo.priceUsd}}</h1>
    <p>{{coinInfo}}</p>
    <charts :coinId='coinName'/>
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
      return this.allCoins.filter(coin => coin.id === this.$route.params.coin)[0];
    }
  }
}  
</script>

<style lang="scss" scoped src='@/styles/coin_page.scss'/>
