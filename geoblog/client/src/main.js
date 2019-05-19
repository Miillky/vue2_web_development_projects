import 'babel-polyfill'
import Vue from 'vue'
import VueFetch, { $fetch } from './plugins/fetch'
import App from './components/App.vue'
import router from './router'
import store from './store'
import * as filters from './filters'
import moment from 'moment'
import {sync} from 'vuex-router-sync'
import VueGoogleMaps from 'vue-googlemaps'

sync(store, router)

export function date(value){
  return moment(value).format('L')
}

// Filters
for(const key in filters){
  Vue.filter(key, filters[key])
}

Vue.use(VueFetch, {
  baseUrl: 'http://localhost:3000/'
})

Vue.use(VueGoogleMaps, {
  load: {
    apiKey: 'AIzaSyCWzaCnSXMhB3IKghlGDm2C_iDjSIgfqnU',
    librarios: ['places']
  }
})

async function main () {
  await store.dispatch('init')

  new Vue({
    ...App,
    el: '#app',
    router,
    // Injected store
    store,
  })
}

main()