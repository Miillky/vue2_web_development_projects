export default function (resources) {
		return {
			data () {
				let initData = {
					remoteDataLoading: 0,
				}

				// Initialize data properties

				initData.remoteErrors = {}
				for(const key in resources){
					initData[key] = null
					initData.remoteErrors[key] = null
				}

				return initData
			},
			methods: {
				async fetchResource(key, url){
					this.$data.remoteDataLoading++
					// Reset error
					this.$data.remoteErrors[key] = null
					try {
						this.$data[key] = await this.$fetch(url)
					} catch (e){
						console.error(e)
						// Put error
						this.$data.remoteErrors[key] = e
					}
					this.$data.remoteDataLoading--
				}
			},
			computed: {
				remoteDataBusy(){
					return this.$data.remoteDataLoading !== 0
				},
				hasRemoteErrors(){
					return Object.keys(this.$data.remoteErrors).some(
						key => this.$data.remoteErrors[key]
					)
				}
			},
			created(){
				for( const key in resources ){
					let url = resources[key]
					// If the value is a function
					// We watch its result
					if(typeof url === 'function'){
						this.$watch(url, (val) => {
							this.fetchResource(key, val)
						},
						{
							immediate: true
						})
					} else {
						this.fetchResource(key, url)
					}
				}
			}
	}
}