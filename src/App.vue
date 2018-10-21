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
    ...mapActions(['fetchCoins', 'fetchingPrices', 'refreshInfo', 'initUser']),
    ...mapMutations(['START_SOCK', 'CLOSE_SOCK', 'MESSAGE_SOCK'])
  },
  created() {

    if(!this.allCoins.length) {
      this.fetchCoins().then(() => {
        // this.fetchingPrices();
        this.START_SOCK();
        this.MESSAGE_SOCK();
      });
    }

    if(!this.userState.name) {
      this.initUser();
    }

    let inter = setInterval(() => {
      this.refreshInfo();
    },10000);
    
  },
  computed: {
    ...mapGetters(['allCoins', 'userState'])
  }
}
</script>

<style lang="scss" src='@/styles/app.scss'/>
