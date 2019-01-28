const book = {
  namespaced: true,
  state: {
    fileName: '',
    ifTitleAndMenuShow: false,
    ifSettingShow: -1 // -1不显示 0：字号 1：主题 2：进度 3：目录
  },
  mutations: {
    SET_FILENAME (state, fileName) {
      state.fileName = fileName
    },
    SET_TITLEANDMENUSHOW (state, flag) {
      state.ifTitleAndMenuShow = flag
    },
    SET_SETTINGSHOW (state, flag) {
      state.ifSettingShow = flag
    }
  },
  actions: {
    setFileName ({
      commit
    }, fileName) {
      commit('SET_FILENAME', fileName)
    },
    setIfTitleAndMenuShow ({
      commit
    }, flag) {
      commit('SET_TITLEANDMENUSHOW', flag)
    },
    setIfSettingShow ({
      commit
    }, flag) {
      commit('SET_SETTINGSHOW', flag)
    }
  },
  getters: {
    fileName: state => state.fileName,
    ifTitleAndMenuShow: state => state.ifTitleAndMenuShow,
    ifSettingShow: state => state.ifSettingShow
  }
}

export default book
