<script>

import LocationInfo from './LocationInfo.vue'
import NoContent from './NoContent.vue'
import CreatePost from './CreatePost.vue'
import PostContent from './PostContent.vue'
import { createNamespacedHelpers } from 'vuex'

// posts module
const {
  mapGetters: postsGetters,
  mapActions: postsActions,
} = createNamespacedHelpers('posts')

export default {
	computed: {
		...postsGetters([
			'draft',
			'currentPost',
		]),
		cssClass(){
			return [
				'blog-content',
				{
					'has-content': this.currentPost
				}
			]
		}
	},
	render(h){

		//varijabla mora biti uppercase prvo jer tako vue prepoznaje da component
		let Content
		if(!this.currentPost){
			Content = NoContent
		} else if(this.draft){
			Content = CreatePost
		} else {
			Content = PostContent
		}

		// vue jsx prepoznaje obične gove ako je prvo slovo taga malo a ako je veliko slovo onda prepoznaje kao komponentu
		return <div class={this.cssClass}>
			<LocationInfo />
			<Content />
		</div>
	}
}

</script>