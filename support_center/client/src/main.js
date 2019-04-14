import 'babel-polyfill'
import Vue from 'vue'
import './global-components'

import AppLayout from './components/AppLayout.vue'
import router from './router'

new Vue({
	el: '#app',
	render: h => h(AppLayout),
	router
})