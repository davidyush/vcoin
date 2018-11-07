<template>
  <div class='container'>
    <aside class='left-side'>
      <div class="user-side">
        <h1 class='user-name'>{{userState.name}}</h1>
        <h4 class='user-money'>${{userState.money.toFixed(4)}}</h4>
      </div>
      <div class="coins">
        <ul class='coins-list'>
          <li
            class='single-coin'
            v-for="coin in userState.userCoins"
            @click="goTo(coin.coinId)"
            :key="coin._id">
            <div class="left-info">
              <img class='icon-coin' :src="`https://static.coincap.io/assets/icons/${coin.coinName.toLowerCase()}@2x.png`" alt="some img">
              <span class='coin-name'>{{coin.coinName}}</span>
            </div>
            <span class='coin-amount'>{{coin.amount % 1 === 0 ? coin.amount : coin.amount.toFixed(4)}}</span>
          </li>
        </ul>
      </div>
      <div class="total">
        <h2>Total money</h2>
        <h3>${{totalMoney}}</h3>
      </div>
    </aside>
    <div class='right-side'>
      <trade-history :trade='userState.tradeHistory'/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TradeHistory from '../components/TradeHistory'

export default {
  name: 'Profile',
  components: {
    TradeHistory
  },
  methods: {
    goTo: function(coinId) {
      this.$router.push({
        name: 'Coin',
        params: { coin: coinId }
      });
    }
  },
  computed: {
    ...mapGetters(['userState', 'allCoins']),
    totalMoney() {
      let amount = 0;
      for(let i = 0; i < this.allCoins.length; i++) {
        for(let j = 0; j < this.userState.userCoins.length; j++) {
          if(this.allCoins[i].id === this.userState.userCoins[j].coinId) {
            amount += this.allCoins[i].priceUsd * this.userState.userCoins[j].amount;
            break;
          }
        }
      }
      return (amount + this.userState.money).toFixed(4);
    }
  },
} 
</script>

<style scoped src='@/styles/profile.scss'/>
