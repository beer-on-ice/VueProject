const book = {
  namespaced: true,
  state: {
    fileName: '',
    ifTitleAndMenuShow: false,
    ifSettingFontShow: -1, // -1不显示 0：字号 1：主题 2：进度 3：目录
    defaultFontSize: 16,
    defaultFontFamily: 'Default',
    fontFamilyVisible: false,
    defaultTheme: 'Default',
    currentBook: null,
    progress: 0,
    section: 0,
    bookAvailable: false
  },
  mutations: {
    SET_FILENAME (state, fileName) {
      state.fileName = fileName
    },
    SET_TITLEANDMENUSHOW (state, flag) {
      state.ifTitleAndMenuShow = flag
    },
    SET_SETTINGSHOW (state, flag) {
      state.ifSettingFontShow = flag
    },
    SET_DEFAULTFONTSIZE (state, fontSize) {
      state.defaultFontSize = fontSize
    },
    SET_DEFAULTFONTFAMILY (state, fontFamily) {
      state.defaultFontFamily = fontFamily
    },
    SET_FONTFAMILYVISIBLE (state, familyVisible) {
      state.fontFamilyVisible = familyVisible
    },
    SET_DEFAULTTHEME (state, theme) {
      state.defaultTheme = theme
    },
    SET_CURRENTBOOK (state, cbook) {
      state.currentBook = cbook
    },
    SET_PROGRESS (state, progress) {
      state.progress = progress
    },
    SET_BOOKAVAILABLE (state, flag) {
      state.bookAvailable = flag
    },
    SET_SECTION (state, section) {
      state.section = section
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
    },
    setDefaultFontSize ({
      commit
    }, fontSize) {
      commit('SET_DEFAULTFONTSIZE', fontSize)
    },
    setDefaultFontFamily ({
      commit
    }, fontFamily) {
      commit('SET_DEFAULTFONTFAMILY', fontFamily)
    },
    setFontFamilyVisible ({
      commit
    }, familyVisible) {
      commit('SET_FONTFAMILYVISIBLE', familyVisible)
    },
    setDefaultTheme ({
      commit
    }, theme) {
      commit('SET_DEFAULTTHEME', theme)
    },
    setCurrentBook ({
      commit
    }, cbook) {
      commit('SET_CURRENTBOOK', cbook)
    },
    setProgress ({
      commit
    }, progress) {
      commit('SET_PROGRESS', progress)
    },
    setBookAvailable ({
      commit
    }, flag) {
      commit('SET_BOOKAVAILABLE', flag)
    },
    setSection ({
      commit
    }, section) {
      commit('SET_SECTION', section)
    }
  },
  getters: {
    fileName: state => state.fileName,
    ifTitleAndMenuShow: state => state.ifTitleAndMenuShow,
    ifSettingFontShow: state => state.ifSettingFontShow,
    defaultFontSize: state => state.defaultFontSize,
    defaultFontFamily: state => state.defaultFontFamily,
    fontFamilyVisible: state => state.fontFamilyVisible,
    defaultTheme: state => state.defaultTheme,
    currentBook: state => state.currentBook,
    progress: state => state.progress,
    bookAvailable: state => state.bookAvailable,
    section: state => state.section
  }
}

export default book
