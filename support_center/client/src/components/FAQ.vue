<template>
	<main class="faq">
		<h1>Frenquently Asked Questions</h1>

		<div class="error" v-if="error">
			Can't load the questions
		</div>

		<section class="list">
			<article v-for="question of questions" :key="question._id" >
				<h2 v-html="question.title"></h2>
				<p v-html="question.content"></p>
			</article>
		</section>

		<Loading v-if="loading" />
	</main>
</template>

<script>
export default {
	data(){
		return {
			questions: [],
			error: null,
			loading: false
		}
	},
	async created(){
		this.loading = true
		try {
			const response = await fetch('http://localhost:3000/questions')
			if(response.ok){
				this.questions = await response.json()
			} else {
				throw new Error('error')
			}
		} catch (e){
			this.error = e
		}
		this.loading = false
	}
}
</script>
