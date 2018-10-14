const coins = {
  state: {
    allCoins: [],
    step: 20,
    offset: 20
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

    ADD_COINS(state, coins) {
      state.allCoins.push(...coins);
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
      });
    },

    fetchOffsetCoins(context) {
      const { step, offset } = context.state;
      fetch(`https://api.coincap.io/v2/assets?limit=${step}&offset=${offset}`)
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
      const coinsList = context.state.allCoins.map(coin => coin.id).join(',');

      const socket = new WebSocket(`wss://ws.coincap.io/prices?assets=${coinsList}`);
      socket.onopen = () => { console.info('web socket rider'); }

      socket.onmessage = (evt) => {
        const msg = JSON.parse(evt.data);
        // console.log(msg);
        context.commit('SET_NEW_PRICE', msg);
      }

      socket.onerror = (err) => { console.error('errore', err); }
    }

  },

  getters: {
    
    allCoins(state) {
      return state.allCoins;
    }

  }
  
}

export default coins;