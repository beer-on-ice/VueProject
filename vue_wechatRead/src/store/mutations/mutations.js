import * as types from './mutations-types'
export default {
  [types.TEST] (state, val) {
    state.value = val
  }
}
