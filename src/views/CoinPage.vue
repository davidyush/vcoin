<template>
  <div>
    <h1 v-if="coinInfo">#{{coinInfo.rank}} {{coinInfo.symbol}} ${{ Number(coinInfo.priceUsd).toFixed(5)}}</h1>
    <charts :coinId='coinName'/>
    <!-- <p>{{ coinInfo }}</p> -->
    <div class='info-block'>
      <user-coin-info v-if="coinInfo" :currentCoin="coinInfo.id"/>
      <trade v-if='coinInfo' :coin="coinInfo"/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Charts from '../components/Charts'
import Trade from '../components/Trade'
import UserCoinInfo from '../components/UserCoinInfo'

export default {
  name: 'Coin',
  components: {
    Charts,
    Trade,
    UserCoinInfo
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
