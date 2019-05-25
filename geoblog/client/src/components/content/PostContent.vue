<template>
	<div class="post-content">
		<template v-if="details">
			<div class="title">
				<img :src="details.author.profile.photos[0].value" />
				<span>
					<span>{{ details.title }}</span>
					<span class="info">
						<span class="name">
							{{ details.author.profile.displayName }}
							<span class="date">{{ details.date | date }}</span>
						</span>
					</span>
				</span>
			</div>
			<div class="content">{{ details.content }}</div>
			<div class="comments">
				<Comment
          v-for="(comment, index) of details.comments"
          :key="index"
          :comment="comment" />
			</div>
			<div class="actions">
				<button
					type="button"
					class="icon-button secondary"
					@click="unselectPost"
				>
				<i class="material-icons">close</i>
				</button>
				<input
					v-model="commentContent"
					placeholder="Type a comment"
					@keyup.enter="submitComment"
				/>
				<button
					type="button"
					class="icon-button"
					@click="submitComment"
					:disabled="!commentFormValid"
				>
				<i class="material-icons">send</i>
				</button>
			</div>
		</template>
		<div class="loading-animation" v-else>
			<div></div>
		</div>
	</div>
</template>

<script>
import Comment from './Comment.vue'
import { createNamespacedHelpers } from 'vuex'

// posts module
const {
	mapGetters: postsGetters,
	mapActions: postsActions,
} = createNamespacedHelpers('posts')

export default {
	components: {
		Comment,
	},
	data(){
		return {
			commentContent: ''
		}
	},
	computed: {
		...postsGetters({
			details: 'selectedPostDetails'
		}),
		commentFormValid(){
			return this.commentContent
		},
	},
	methods: {
		...postsActions([
			'sendComment',
			'unselectPost',
		]),
		async submitComment(){
			if(this.commentFormValid){
				this.sendComment({
					post: this.details,
					comment: {
						content: this.commentContent
					}
				})
			}
			this.commentContent = ''
		}
	},
}

</script>