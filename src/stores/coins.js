const coins = {
  state: {
    allCoins: [],
    listCoins: [],
    step: 20,
    offset: 20,
    sock: null
  },
  //unstable mutations and actions
  mutations: {

    SET_COINS(state, coins) {
      state.allCoins = coins;
    },

    SET_LIST_COINS(state, coins) {
      state.listCoins = coins.map(coin => coin.id);
    },

    ADD_LIST_COINS(state, coins) {
      state.listCoins = [...new Set(state.listCoins.concat(coins))];
    },

    ADD_COINS(state, coins) {
      coins.forEach(newCoin => {
        if(!state.allCoins.some(coin => coin.id === newCoin.id)) {
          state.allCoins.push(newCoin);
        }
      });


      state.listCoins.push(...coins.map(coin => coin.id));
      state.offset += state.step;
    },

    ADD_COIN(state, coin) {
      state.allCoins.push(coin); //uniq?
      state.listCoins.push(coin.id);
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

    PURE_REFRESH(state, coins) {
      for(let i = 0; i < state.allCoins.length; i++) {
        const newInfo = coins.find(coin => coin.id === state.allCoins[i].id) || null;
        if(newInfo) {
          state.allCoins[i].changePercent24Hr = newInfo.changePercent24Hr;
          state.allCoins[i].marketCapUsd = newInfo.marketCapUsd;
          state.allCoins[i].volumeUsd24Hr = newInfo.volumeUsd24Hr;
        }
      }
    },

    SEARCH_COINS(state, word) {
      if(word !== '') {
        const val = word.toUpperCase();
        state.currentCoins = state.allCoins.filter(coin => {
          return coin.id.startsWith(val) || coin.symbol.startsWith(val);
        });
      } else {
        state.currentCoins = state.allCoins.slice(0, state.offset);
      }
    },

    START_SOCK(state) {
      const coinsList = state.listCoins.join(',');
      console.log( 'coinsList', coinsList, state.listCoins.length);
      state.sock = new WebSocket(`wss://ws.coincap.io/prices?assets=${coinsList}`);
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

    fetchCoin(context, coinId) {
      return fetch(`https://api.coincap.io/v2/assets/${coinId}`)
        .then(res => res.json())
        .then(json => {
          const data = json.data;
          context.commit('ADD_COIN', data);
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
          context.commit('PURE_REFRESH', data);
      });
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