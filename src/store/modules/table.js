// initial state
const state = {
  visible: false
}

// getters
const getters = {}

// actions
const actions = {
  setVisible({ commit }, visible) {
    commit('setVisible', visible)
  }
}

// mutations
const mutations = {
  setVisible(state, visible) {
    state.visible = visible
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

