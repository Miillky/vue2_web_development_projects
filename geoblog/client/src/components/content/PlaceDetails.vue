<script>
export default {
	props: {
		name: String,
		adress: String,
	},
	render(h){
		return <div class="details">
			<div class="name"><i class="material-icons">place</i>
				{this.name}</div>
			<div class="address"> {this.address}</div>
		</div>
	},
}
</script>