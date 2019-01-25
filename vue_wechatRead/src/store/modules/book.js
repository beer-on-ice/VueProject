const book = {
  namespaced: true,
  state: {
    fileName: ''
  },
  mutations: {
    SET_FILENAME (state, fileName) {
      state.fileName = fileName
    }
  },
  actions: {
    setFileName ({
      commit
    }, fileName) {
      commit('SET_FILENAME', fileName)
    }
  },
  getters: {
    fileName (state) {
      return state.fileName
    }
  }
}

export default book
