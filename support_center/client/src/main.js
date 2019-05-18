import 'babel-polyfill'
import Vue from 'vue'
import './components'

import AppLayout from './components/AppLayout.vue'
import router from './router'
import VueFetch, { $fetch } from './plugins/fetch'
import state from './state'
import VueState from './plugins/state'

import * as filters from './filters'
for(const key in filters){
	Vue.filter(key, filters[key])
}

Vue.use( VueFetch, {
	baseUrl: 'http://localhost:3000/'
})

Vue.use(VueState, state)

async function main(){
	// Get user info
	try {
		state.user = await $fetch('user')

	} catch(e) {
		console.warn(e);
	}
}

//Lunch app
new Vue({
	el: '#app',
	data: state,
	router,
	render: h => h(AppLayout),
})

main()