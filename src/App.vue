<template>
  <div id="app">
    <main-header/>
    <div class="main-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

import MainHeader from './components/MainHeader.vue';
export default {
  name: 'App',
  components: {
    MainHeader
  },
  methods: {
    ...mapActions(['fetchCoins', 'fetchCoin', 'refreshInfo', 'initUser', 'restartSock']),
    ...mapMutations(['START_SOCK', 'CLOSE_SOCK', 'MESSAGE_SOCK', 'ADD_LIST_COINS']),
    getUniqUserCoins() {
      const userCoins = this.userState.userCoins;
      for(let i = 0; i < userCoins.length; i++) {
        if(!this.allCoins.some(coin => coin.id === userCoins[i].coinId)) {
          this.fetchCoin(userCoins[i].coinId);
        }
      }
    }
  },
  created() {

    if(!this.userState.name) {
      this.initUser().then(() => {
        this.fetchCoins().then(() => {
          this.ADD_LIST_COINS(this.userListCoins);
          this.getUniqUserCoins();
          this.START_SOCK();
          this.MESSAGE_SOCK();
        });
      });
    } else {
      this.fetchCoins().then(() => {
        this.START_SOCK();
        this.MESSAGE_SOCK();
      });
    }

    let inter = setInterval(() => {
      this.refreshInfo();
    },10000);
    
  },
  computed: {
    ...mapGetters(['allCoins', 'userState', 'userListCoins'])
  }
}
</script>

<style lang="scss" src='@/styles/app.scss'/>
