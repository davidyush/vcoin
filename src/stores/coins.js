const coins = {
  state: {
    allCoins: [],
    listCoins: [],
    step: 20,
    offset: 20,
    sock: null
  },
  
  mutations: {

    SET_COINS(state, coins) {
      state.allCoins = coins;
    },

    SET_NEW_PRICE(state, prices) {
      for(let i = 0; i < state.allCoins.length; i++) {
        for(let price in prices) {
          if(state.allCoins[i].id === price) {
            state.allCoins[i].priceUsd = prices[price];
          }
        }
      }
    },

    SET_LIST_COINS(state, coins) {
      state.listCoins = coins.map(coin => coin.id);
    },

    ADD_COINS(state, coins) {
      state.allCoins.push(...coins);
      state.listCoins.push(...coins.map(coin => coin.id));
      state.offset += state.step;
    },

    REFRESH_INFO(state, coins) {
      for(let i = 0; i < coins.length; i++) {
        if(coins[i].id === state.allCoins[i].id) {
          coins[i].priceUsd = state.allCoins[i].priceUsd;
        } else {
          coins[i].priceUsd = state.allCoins.find(coin => coin.id === coins[i].id);
        }
      }
      state.allCoins = coins;
    },

    SEARCH_COINS(state, word) {
      if(word !== '') {
        const val = word.toUpperCase();
        state.currentCoins = state.allCoins.filter(coin => {
          return coin.long.startsWith(val) || coin.short.startsWith(val);
        });
      } else {
        state.currentCoins = state.allCoins.slice(0, state.offset);
      }
    },

    START_SOCK(state) {
      const coinsList = state.listCoins.join(',');
      state.sock = new WebSocket(`wss://ws.coincap.io/prices?assets=${coinsList}`);
      // state.sock.onopen = () => console.log('webSocketRider here');
      // state.sock.onerror = () => console.log('webSocketRider error');
      // state.sock.onclose = () => console.log('webSocketRider is dead');
    },

    CLOSE_SOCK(state) {
      state.sock.close();
    },

    MESSAGE_SOCK(state) {
      state.sock.onmessage = (evt) => {
        const prices = JSON.parse(evt.data);
        for(let i = 0; i < state.allCoins.length; i++) {
          for(let price in prices) {
            if(state.allCoins[i].id === price) {
              state.allCoins[i].priceUsd = prices[price];
            }
          }
        }
      }
    }

  },

  actions: {

    fetchCoins(context) {
      const { step } = context.state;
      return fetch(`https://api.coincap.io/v2/assets?limit=${step}`)
        .then(res => res.json())
        .then(json => {
          const data = json.data;
          context.commit('SET_COINS', data);
          context.commit('SET_LIST_COINS', data);
      });
    },

    fetchOffsetCoins(context) {
      const { step, offset } = context.state;
      return fetch(`https://api.coincap.io/v2/assets?limit=${step}&offset=${offset}`)
        .then(res => res.json())
        .then(json => {
          const data = json.data;
          context.commit('ADD_COINS', data);  
      });
    },

    refreshInfo(context) {
      const { offset } = context.state;
      fetch(`https://api.coincap.io/v2/assets?limit=${offset}`)
        .then(res => res.json())
        .then(json => {
          const data = json.data;
          context.commit('REFRESH_INFO', data);
      });
    },

    fetchingPrices(context) {
      const coinsList = context.state.listCoins.join(',');

      const socket = new WebSocket(`wss://ws.coincap.io/prices?assets=${coinsList}`);
      socket.onopen = () => { console.info('web socket rider'); }

      socket.onmessage = (evt) => {
        const msg = JSON.parse(evt.data);
        context.commit('SET_NEW_PRICE', msg);
      }

      socket.onerror = (err) => { console.error('errore', err); }

      socket.onclose = () => { console.log('web socket rider is dead now', new Date()); }
    },

    restartSock(context) {
      context.commit('CLOSE_SOCK');
      context.commit("START_SOCK");
      context.commit('MESSAGE_SOCK');
    }

  },

  getters: {
    
    allCoins(state) {
      return state.allCoins;
    }

  }
  
}

export default coins;