<template>
  <div class='container' v-if="userState.name">
    <h2>{{userState.name}}</h2>
    <p>${{userState.money.toFixed(4)}}</p>
    <p>{{amount}} {{currentCoin}}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'UserCoinInfo',
  props: ['currentCoin'],
  computed: {
    ...mapGetters(['userState']),
    amount() {
      const userCoin = this.userState.userCoins.find(coin => {
        return coin.coinName === this.currentCoin;
      });
      return userCoin ? userCoin.amount : 0;
    }
  }
}
</script>

<style lang="scss" scoped src='@/styles/user_coin.scss'/>

