import 'babel-polyfill'
import Vue from 'vue'
import './global-components'

import AppLayout from './components/AppLayout.vue'
import router from './router'
import VueFetch from './plugins/fetch'

Vue.use( VueFetch, {
	baseUrl: 'http://localhost:3000/'
})

new Vue({
	el: '#app',
	render: h => h(AppLayout),
	router
})