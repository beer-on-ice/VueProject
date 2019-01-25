import * as types from '../mutations/mutations-types'

export default {
  change ({
    commit,
    state
  }, val) {
    commit(types.TEST, val)
  }
}
