import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

require('bulma/css/bulma.css')
require('./main.css')
require('./external/fontawesome-all')
// require('mdi/css/materialdesignicons.min.css')

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
