import Vue from 'vue'

const app = new Vue({
  // el: '#app',
  template: '<div>{{text}}</div>',
  data: {
    text: '123'
  }
}).$mount('#app')

setInterval(() => {
  app.text++
}, 1000)

console.log(app.$data)
