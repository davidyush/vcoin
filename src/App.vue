<template>
  <div id="app">
    <main-header/>
    <div class="main-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import MainHeader from './components/MainHeader.vue';
export default {
  name: 'App',
  components: {
    MainHeader
  },
  methods: {
    ...mapActions(['fetchCoins', 'fetchingPrices', 'refreshInfo'])
  },
  created() {

    if(!this.allCoins.length) {
      this.fetchCoins().then(() => {
        this.fetchingPrices();
      });
    }

    let inter = setInterval(() => {
      this.refreshInfo();
      console.log('happen');
    },10000);
    
  },
  computed: {
    ...mapGetters(['allCoins'])
  }
}
</script>

<style lang="scss" src='@/styles/app.scss'/>
