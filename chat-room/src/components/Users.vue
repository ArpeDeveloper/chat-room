<template>
	<div class="users">
		<ul class="list-group" v-on:loadusers="loadUsers">
			<User/>
		</ul>
	</div>
</template>

<script>
	import User from './User.vue'

	export default {
		name: 'Users',
		components:{
			User
		},
		props: {
			//error: String,
		},
		data:function(){
			return {
			}
		},
		methods:{
			loadUsers: function(data){
				console.log(data)
			}
		},
		created :function(){
			this.$root.$on("loadusers",this.loadUsers)
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
