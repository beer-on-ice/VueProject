export default {
  updateCount (state, {num, num2}) {
    console.log('mutations updateCount: ' + num2)
    state.count = num
  }
}
