import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fetchPolyfill from 'fetch-polyfill'
import VueLazyload from 'vue-lazyload'
import { Tabs, TabPane, Loading, Badge, Card, Progress } from 'element-ui'
import './assets/css/important.css'

Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Loading)
Vue.use(Badge)
Vue.use(Card)
Vue.use(Progress)
Vue.use(fetchPolyfill)

Vue.use(VueLazyload, {
  loading: require('./assets/img/default.gif')
})

Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
})
