<template>
  <div class='container'>
    <div class='buy'>
      <h2 class='buy-title'>Buy</h2>
      <form class='buy-form' @submit.prevent="buyCoins">
        <input
          type="number"
          class='buy-count'
          step='any'
          :placeholder="coin.symbol"
          v-model='buyCoinCount'
          @input="buyCoinChange"
        >
        <input
          type="number"
          class='usd-count'
          step='any'
          placeholder="USD"
          v-model="buyUsdPrice"
          @input='buyUsdPriceChange'
        >
        <input type="submit" class='btn-buy' value='Buy'>
      </form>
    </div>
    <div class='sell'>
      <h2 class='sell-title'>Sell</h2>
      <form class='sell-form'>
        <input
          type="number"
          class='sell-count'
          :placeholder="coin.symbol"
          v-model='sellCoinCount'
          @input="sellCoinChange"
        >
        <input
          type="number"
          class='usd-count'
          step='any'
          placeholder="USD"
          v-model='sellUsdPrice'
          @input="sellUsdPriceChange"
        >
        <input type="submit" class='btn-sell' value='Sell'>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'Trade',
  props: ['coin'],
  data() {
    return {
      buyCoinCount: "",
      buyUsdPrice: "",
      sellCoinCount: "",
      sellUsdPrice: ""
    }
  },
  methods: {
    ...mapMutations(['SET_USER']),
    buyCoinChange(event) {
      if(+event.target.value <= 0) {
        this.buyCoinCount = 0;
        return;
      }
      console.log(typeof this.coin.priceUsd);
      this.buyUsdPrice = +this.coin.priceUsd * +event.target.value;
    },
    buyUsdPriceChange(event) {
      if(+event.target.value < 0) {
        this.buyUsdPrice = 0;
        return;
      }
      this.buyCoinCount = +event.target.value / +this.coin.priceUsd; 
    },
    sellCoinChange(event) {
      if(+event.target.value < 0) {
        this.sellCoinCount = 0;
        return;
      }
      this.sellUsdPrice = +this.coin.priceUsd * +event.target.value
    },
    sellUsdPriceChange(event) {
      if(+event.target.value < 0) {
        this.sellUsdPrice = 0;
        return;
      }
      this.sellCoinCount = +event.target.value / +this.coin.priceUsd;
    },
    buyCoins() {
      console.log(this.buyCoinCount);
      if(this.userState.money > this.buyUsdPrice) {
        const buyObj = {
          coinId: this.coin.id,
          coinSymbol: this.coin.symbol,
          amount: this.buyCoinCount,
          token: localStorage.pepele,
          price: this.coin.priceUsd,
        }
        console.log(buyObj);
        axios.post('/api/buycoins', buyObj).then(res => {
          console.log('res', res);
          this.SET_USER(res.data.user);
        });
      }
    },
    sellCoins() {
      const amountUserCoin = this.userState.coins.find(coin => coin.id === this.coin.id).amount;
      if(amountUserCoin && amountUserCoin <= this.sellCoinCount) {
        const sellObj = {
          coinId: this.coin.id,
          amount: this.sellCoinCount,
          token: localStorage.pepele,
          price: this.coin.priceUsd
        }
      }
    }
  },
  computed: {
    ...mapGetters(['userState'])
  }
}  
</script>

<style lang="scss" scoped src='@/styles/trade.scss'/>
