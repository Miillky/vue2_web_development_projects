<template>
	<div class="blog-map">
		<googlemaps-map
			ref="map"
			:center="center"
			:zoom="zoom"
			:options="mapOptions"
			@update:center="setCenter"
			@update:zoom="setZoom"
			@click="onMapClick"
			@idle="onIdle"
		>
			<!-- User Position -->
			<googlemaps-user-position
				@update:position="setUserPosition"
			/>

			<googlemaps-marker
        v-for="post of posts"
        :key="post._id"
        :label="{
          color: post === currentPost ? 'white' : 'black',
          fontFamily: 'Material Icons',
          fontSize: '20px',
          text: 'face',
        }"
        :position="post.position"
        :z-index="5"
        @click="selectPost(post._id)"
      />

			<!-- New post marker -->
      <googlemaps-marker
        v-if="draft"
        :clickable="false"
        :label="{
          color: 'white',
          fontFamily: 'Material Icons',
          text: 'add_circle',
        }"
        :opacity=".75"
        :position="draft.position"
        :z-index="6"
      />
		</googlemaps-map>
	</div>
</template>

<script>
import { createNamespacedHelpers, mapGetters, mapActions } from 'vuex'

// Vuex mappers
// maps module
const {
	mapGetters: mapsGetters,
	mapActions: mapsActions,
} = createNamespacedHelpers('maps')

// posts module
const {
	mapGetters: postsGettters,
	mapActions: postsActions,
} = createNamespacedHelpers('posts')

export default {
	computed: {
		...mapsGetters([
			'center',
			'zoom',
		]),
		...postsGettters([
		'draft',
		'posts',
		'currentPost',
		]),
		mapOptions(){
			return {
				fullscreenControl: false
			}
		},
	},
	methods: {
		...mapsActions([
			'setBounds',
			'setCenter',
			'setUserPosition',
			'setZoom'
		]),
		...postsActions([
			'selectPost',
			'setDraftLocation',
		]),
		onMapClick(event){
			this.setDraftLocation({
				position: event.latLng,
				placeId: event.placeId
			})
		},
		onIdle(){
			this.setBounds(this.$refs.map.getBounds())
		}
	},
	created(){
		console.log(this.$refs.map);
	}
}
</script>