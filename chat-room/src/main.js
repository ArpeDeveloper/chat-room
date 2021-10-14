import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'; import 'bootstrap/dist/css/bootstrap.min.css';
import LoadScript from 'vue-plugin-load-script';
require('dotenv').config();


Vue.config.productionTip = false
Vue.use(LoadScript)
new Vue({
	render: h => h(App),
}).$mount('#app');
