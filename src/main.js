import Vue from 'vue'
import App from './App.vue'
import axios from "axios";
import VueAxios from "vue-axios";
import './registerServiceWorker'
import vuetify from './plugins/vuetify'

const instance = axios.create({});

Vue.use(VueAxios, instance);
Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
