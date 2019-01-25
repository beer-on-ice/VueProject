import Vue from 'vue'
import App from './App.vue'
import Router from './routes/router'
import Store from './store/store'

import './assets/styles/icon.css'
import './assets/styles/global.scss'
import './assets/fonts/daysOne.css'

Vue.config.productionTip = false

const router = new Router()
const store = new Store()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
