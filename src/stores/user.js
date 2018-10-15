import axios from 'axios';
import decode from 'jwt-decode';

const user = {
  state: {
    name: '',
    email: '',
    token: '',
    money: 0,
    coins: [],
    tradeHistory: [],
    errors: []
  },

  mutations: {
    SET_USER(state, user) {
      state.name = user.name;
      state.email = user.email;
      state.token = user.token;
      state.money = user.money;
      state.coins = user.coins;
      state.tradeHistory = user.tradeHistory;
    },
    SET_COINS(state, user) {
      state.coins = user.coins;
    },
    SET_TRADE_HISTORY(state, user) {
      state.tradeHistory = user.tradeHistory;
    },
    SET_MONEY(state, user) {
      state.money = user.money;
    },
    LOG_OUT(state) {
      state.name = state.email = state.token = '';
      state.coins = state.tradeHistory = [];
      state.money = 0;
      localStorage.pepele = '';
    },
    SET_IN_LOCAL_STORAGE(state) {
      localStorage.pepele = state.token;
    },
    SET_ERROR(state, err) {
      state.errors.push(err);
    }
  },

  actions: {
    signIn({ commit }, userData) {
      axios.post('/api/signin', userData).then(res => {
        commit('SET_USER', res.data.user);
        commit('SET_IN_LOCAL_STORAGE');
      }).catch(err => {
        commit('SET_ERROR', err.response.data.errors.message);
      });
    },
    login({}, userData) {
      return axios.post('/api/auth', userData);
    },
    initUser({ commit }) {
      if(localStorage.pepele) {
        let userData = {
          ...decode(localStorage.pepele),
          token: localStorage.pepele
        };
        axios.post('/api/auth', userData).then(res => {
          commit('SET_USER', res.data.user);
        })
      } else {
        return;
      }
    }
  },

  getters: {
    userState(state) {
      return {
        name: state.name,
        email: state.email,
        token: state.token,
        money: state.money,
        coins: state.coins,
        tradeHistory: state.tradeHistory
      };
    },
    userErrors(state) {
      return state.errors;
    }
  }

}

export default user;