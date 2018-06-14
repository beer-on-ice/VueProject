
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

import 'common/stylus/index.styl'

Vue.use(VueResource)

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  data: {
    eventHub: new Vue()
  }
})
