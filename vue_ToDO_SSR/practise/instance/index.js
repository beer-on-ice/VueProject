import Vue from 'vue'

const app = new Vue({
  // el: '#app',
  template: '<div>{{text}} {{obj.a}}</div>',
  data: {
    text: 123,
    obj: {}
  }
}).$mount('#app')

// let i = 0
setInterval(() => {
  app.text += 1
  // app.$data.text++

  // i++
  // app.obj.a = i
  // app.$forceUpdate()

  // app.$set(app.obj, 'a', i)
}, 1000)

// console.log(app.$data)
// console.log(app.$props)
// console.log(app.$el)
// console.log(app.$options)

// app.$options.render = (h) => {
//   return h('div', {}, 'new render function')
// }

// console.log(app.$root === app)
// console.log(app.$children)
// console.log(app.$slots)
// console.log(app.$scopedSlots)
// console.log(app.$refs)
// console.log(app.$isServer)

const unwatch = app.$watch('text', (newText, oldText) => {
  console.log(newText + ' - ' + oldText)
})
setTimeout(() => {
  unwatch()
}, 2000)

app.$on('test', (a, b) => {
  console.log(`test emited ${1} ${b}`)
})
app.$emit('test', 1, 2)
