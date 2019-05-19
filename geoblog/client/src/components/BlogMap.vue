<template>
	<div class="blog-map">
		<googlemaps-map
			:center="center"
			:zoom="zoom"
			:options="mapOptions"
			@update:center="setCenter"
			@update:zoom="setZoom"
		>
			<!-- User Position -->
			<googlemaps-user-position
				@update:position="setUserPosition"
			/>
		</googlemaps-map>
	</div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const {
	mapGetters,
	mapActions,
} = createNamespacedHelpers('maps')

export default {
	computed: {
		...mapGetters([
			'center',
			'zoom',
			'userPosition'
		]),
		mapOptions(){
			return {
				fullscreenControl: false
			}
		}
	},
	methods: mapActions([
		'setCenter',
		'setZoom',
		'setUserPosition'
	])
}
</script>