<template>
  <div class='container'>
    <aside class='left-side'>
      <div class="user-side">
        <h1 class='user-name'>{{userState.name}}</h1>
        <h4 class='user-money'>${{userState.money}}</h4>
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
            <span class='coin-amount'>{{coin.amount}}</span>
          </li>
        </ul>
      </div>
    </aside>
    <div class='right-side'>
      <p>{{ userState }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Profile',
  methods: {
    goTo: function(coinId) {
      this.$router.push({
        name: 'Coin',
        params: { coin: coinId }
      });
    }
  },
  computed: {
    ...mapGetters(['userState'])
  }
} 
</script>

<style scoped src='@/styles/profile.scss'/>
