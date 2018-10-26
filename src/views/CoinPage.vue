<template>
  <div>
    <div class='coin-container'>
      <!-- <h2 v-if="coinInfo">#{{coinInfo.rank}} {{coinInfo.symbol}} ${{ Number(coinInfo.priceUsd).toFixed(5)}}</h2> -->
      <div class='info-block'>
        <single-coin-info v-if="coinInfo" :info="coinInfo"/>
        <user-coin-info v-if="coinInfo" :currentCoin="coinInfo.symbol"/>
      </div>
      <div class='right-block'>
        <trade v-if='coinInfo' :coin="coinInfo"/>
      </div>
    </div>
      <div class="container">
        <charts :coinId='coinName'/>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Charts from '../components/Charts'
import Trade from '../components/Trade'
import UserCoinInfo from '../components/UserCoinInfo'
import SingleCoinInfo from '../components/SingleCoinInfo'

export default {
  name: 'Coin',
  components: {
    Charts,
    Trade,
    UserCoinInfo,
    SingleCoinInfo
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
