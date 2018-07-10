
import Vuex from 'vuex'
import defaultState from './state/state'
import mutations from './mutations/mutations'
import getters from './getters/getters'
import actions from './actions/actions'

const isDev = process.env.NODE_ENV === 'development'
export default () => {
  const store = new Vuex.Store({
    strict: isDev, // 是否能直接修改state值，而不通过mutations
    state: defaultState,
    mutations,
    getters,
    actions,
    modules: {
      a: {
        namespaced: true, // 命名空间
        state: {
          text: 1
        },
        mutations: {
          updateText (state, text) {
            console.log('a.state: ' + state.text)
            state.text = text
          }
        },
        getters: {
          // rootState: 全局的state
          // getters： 所有getters方法
          textPlus (state, getters, rootState) {
            // return state.text + 1 + rootState.count
            return state.text + 1 + rootState.b.text
          }
        },
        actions: {
          // commit: 模块里的commit
          add ({state, commit, rootState}) {
            // commit('updateText', rootState.count) // 调用模块里的mutations
            commit('updateCount', {num: 56789}, {root: true}) // 调用全局的mutations
          }
        }
      },
      b: {
        // namespaced: true,
        state: {
          text: 2
        },
        actions: {
          testAction ({commit}) {
            commit('a/updateText', 'b test text', {root: true})
            // commit('a/updateText', 'b test text')
          }
        }
      }
    }
  })
  // 热更新
  if (module.hot) {
    module.hot.accept([
      './state/state',
      './mutations/mutations',
      './getters/getters',
      './actions/actions'
    ], () => {
      const newState = require('./state/state').default
      const newMutations = require('./mutations/mutations').default
      const newGetters = require('./getters/getters').default
      const newActions = require('./actions/actions').default
      store.hotUpdate({
        state: newState,
        mutations: newMutations,
        getters: newGetters,
        actions: newActions
      })
    })
  }
  return store
}
