import Vue from 'vue'
import App from './App.vue'
import Router from './routes/router'
import Store from './store/store'
import i18n from './lang'

import './assets/styles/icon.css'
import './assets/styles/global.scss'

Vue.config.productionTip = false

const router = new Router()
const store = new Store()

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
