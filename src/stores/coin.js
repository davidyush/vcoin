const coin = {
  state: {
    history: {}
  },

  mutations: {

    SET_HISTORY(state, dataHistory) {
      const historyData = dataHistory.map(item => item.priceUsd);
      const historyLabels = dataHistory.map(item => {
        // return (new Date(item.time)).toISOString();
        const hour = (new Date(item.time)).getHours();
        return hour <= 12 ? hour + 'am' : hour - 12 + 'pm';
      });

      state.history = {
        data: historyData,
        labels: historyLabels
      };
    }

  },

  actions: {

    getHistory(context, options) {
      const { interval, coin, limit } = options;
      return fetch(`https://api.coincap.io/v2/assets/${coin}/history?interval=${interval}&limit=${limit}`)
        .then(res => res.json())
        .then(json => {
          const data = json.data;
          context.commit('SET_HISTORY', data)
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