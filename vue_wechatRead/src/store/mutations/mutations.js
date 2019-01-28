import * as types from './mutations-types'
export default {
  [types.SETTITLEANDMENUSHOW] (state, flag) {
    state.ifTitleAndMenuShow = flag
  }
}
