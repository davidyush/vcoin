const coin = {
  state: {
    history: {}
  },

  mutations: {

    SET_HISTORY(state, dataHistory) {
      const historyData = dataHistory.map(item => item.priceUsd);
      let historyLabels;
      if(dataHistory.flag === 'd' || dataHistory.flag === 'w') {
        historyLabels = dataHistory.map(item => {
          const hour = (new Date(item.time)).getHours();
          return hour <= 12 ? hour + 'am' : hour - 12 + 'pm';
        });
      } else {
        historyLabels = dataHistory.map(item => {
          const date = (new Date(item.time)).toDateString();
          return date.split(' ').slice(1,3).join(' ');
        });
      }


      state.history = {
        data: historyData,
        labels: historyLabels
      };
    }

  },

  actions: {

    getHistory(context, options) {
      const { interval, coin, flag } = options;
      const end = Date.now();
      let start = 0;
      if(flag === 'd') {
        start = end - (24 * 60 * 60 * 1000);
      } else if(flag === 'w') {
        start = end - (24 * 60 * 60 * 1000 * 7);
      } else if(flag === 'm') {
        start = end - (24 * 60 * 60 * 1000 * 30);
      } else if(flag === 'm3') {
        start = end - (24 * 60 * 60 * 1000 * 91);
      } else if(flag === 'y') {
        start = end - (24 * 60 * 60 * 1000 * 365);
      }
      return fetch(`https://api.coincap.io/v2/assets/${coin}/history?interval=${interval}&start=${start}&end=${end}`)
        .then(res => res.json())
        .then(json => {
          const data = json.data;
          data.flag = flag;
          context.commit('SET_HISTORY', data);
      });
    }

  },

  getters: {

    coinHistory(state) {
      return state.history;
    }

  }
}

export default coin;