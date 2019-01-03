
const account = {
  state: {
    capital: 500000.00,
    asset: { cash: 0, fixed: 0, equity: 0 },
    ratio: { cash: 0.1, fixed: 0.7, equity: 0.2 }
  },

  mutations: {
    SET_CAPITAL: (state, capital) => {
      state.capital = capital
    },
    SET_ASSET_RATIO_CASH: (state, cash) => {
      state.ratio.cash = cash
    },
    SET_ASSET_RATIO_FIXED: (state, fixed) => {
      state.ratio.fixed = fixed
    },
    SET_ASSET_RATIO_EQUITY: (state, equity) => {
      state.ratio.equity = equity
    },
    calculate: (state) => {
      debugger
      if (state.capital) {
        state.asset.cash = state.capital * state.ratio.cash
        state.asset.fixed = state.capital * state.ratio.fixed
        state.asset.equity = state.capital * state.ratio.equity
      }
    }
  },

  actions: {
  }
}

export default account
