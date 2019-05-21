export default {
	namespaced: true,

	state(){
		return {
			center: {
				lat: 48.8538302,
				lng: 2.2982161
			},
			zoom: 15,
			userPosition: null
		}
	},
	getters: {
		center: state => state.center,
		zoom: state => state.zoom,
		userPosition: state => state.userPosition
	},
	mutations: {
		center(state, value){
			state.center = value
		},
		zoom(state, value){
			state.zoom = value
		},
		userPosition(state, value){
			state.userPosition = value
		}
	},
	actions: {
		setCenter({commit}, value){
			commit('center', value)
		},
		setZoom({commit}, value){
			commit('zoom', value)
		},
		setUserPosition({dispatch, commit, getters}, value){
			const position = getters.userPosition
			commit('userPosition', value)
			if(!position){
				dispatch('centerOnUser')
			}
		},
		async centerOnUser({dispatch, getters}){
			const position = getters.userPosition
			if(position){
				dispatch('setCenter', position)
			}
		},
		setBounds ({ dispatch }, value) {
			dispatch('posts/fetchPosts', {
				mapBounds: value,
			}, {
				root: true,
			})
		}
	}
}