import Vue from 'vue'

const app = new Vue({
  // el: '#app',
  // template: '<div>{{text}}</div>',
  data: {
    text: 123
  },
  beforeCreate () {
    console.log(this.$el, 'beforeCreated')
  },
  created () {
    console.log(this.$el, 'created')
  },
  beforeMount () {
    console.log(this.$el, 'beforeMounted')
  },
  mounted () {
    console.log(this.$el, 'mounted')
  },
  beforeUpdate () {
    console.log(this, 'beforeUpdate')
  },
  updated () {
    console.log(this, 'updated')
  },
  activated () { // 组件章节
    console.log(this, 'activated')
  },
  deactivated () {
    console.log(this, 'deactivated')
  },
  beforeDestroy () {
    console.log(this, 'beforeDestroy')
  },
  destroyed () {
    console.log(this, 'destroyed')
  },
  render (h) {
    // throw new TypeError('render error')
    console.log('render function invoked')
    return h('div', {}, this.text)
  },
  renderError (h, err) {
    return h('div', {}, err.stack)
  },
  errorCaptured () {
    // 会向上冒泡，并且在正式环境可用
  }
})

app.$mount('#app')

// setInterval(() => {
//   app.text++
// }, 1000)

// setTimeout(() => {
//   app.$destroy()
// }, 3000)
