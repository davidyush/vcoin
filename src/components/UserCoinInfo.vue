<template>
  <div class='container'>
    <h1>{{userState.name}}</h1>
    <p>${{userState.money}}</p>
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
      console.log('watching for', this.currentCoin);
      return this.userState.coins && this.userState.coins.find(coin => {
        return coin.coinId === this.currentCoin;
      }) || `You have not `;
    }
  }
}
</script>

<style lang="scss" scoped src='@/styles/user_coin.scss'/>

