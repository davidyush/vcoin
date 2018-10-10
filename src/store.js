import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import coins from '@/stores/coins';
import user from '@/stores/user';
import coin from '@/stores/coin';

export default new Vuex.Store({
  modules: {
    coins,
    user,
    coin
  }
});
