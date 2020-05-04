import Vue from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import plugins from './plugins'
import filters from './filters'
import store from './store'

Vue.use(plugins)
Vue.use(filters)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
