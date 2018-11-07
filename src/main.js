import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import CxltToastr from 'cxlt-vue2-toastr';
import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css';

const toastrConfigs = {
  position: 'top right',
  showDuration: 500,
  hideDuration: 500,
  timeOut: 3000
};

console.log('config used');
Vue.use(CxltToastr, toastrConfigs);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
