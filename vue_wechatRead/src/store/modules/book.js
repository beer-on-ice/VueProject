const book = {
  namespaced: true,
  state: {
    book: '没有名字'
  },
  mutations: {
    CHANGEBOOK (state, val) {
      state.book = val
    }
  },
  actions: {
    CHANGEBOOKSYNC ({
      commit,
      state
    }, val) {
      commit('CHANGEBOOK', val)
    }
  },
  getters: {
    book (state) {
      return state.book
    }
  }
}

export default book
