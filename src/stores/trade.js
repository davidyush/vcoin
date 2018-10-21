const trade = {
  state: {
    buyCoinCount: 0,
    buyUsdPrice: 0,
    sellCoinCount: 0,
    sellUsdPrice: 0,
  },

  mutations: {
    SET_BUY_COIN(state, count) {
      state.buyCoinCount = count;
    }
  }
}