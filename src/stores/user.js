import axios from 'axios';
import decode from 'jwt-decode';

const user = {
  state: {
    name: '',
    email: '',
    token: '',
    money: 0,
    coins: [],
    tradeHistory: []
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
      localStorage.pepeCry = '';
    },
    SET_IN_LOCAL_STORAGE(state) {
      localStorage.pepeCry = state.token;
    }
  },

  actions: {
    signIn({}, userData) {
      return axios.post('/api/users', userData);
    },
    login({}, userData) {
      return axios.post('/api/auth', userData);
    },
    initUser({ commit }) {
      if(localStorage.pepeCry) {
        let userData = {
          ...decode(localStorage.pepeCry),
          token: localStorage.pepeCry
        };
        axios.post('/api/auth/validate_token', userData).then(res => {
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
    }
  }

}

export default user;