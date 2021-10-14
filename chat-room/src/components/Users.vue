<template>
	<div class="users">
		<ul v-if="usersList.length" class="list-group">
			<User :userData="user" :key="user.id" v-for="user in usersList"/>
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
				usersList:[],
			}
		},
		methods:{
			loadUsers: function(data){
				if(Array.isArray(data)){
					this.$root.$data.usersList = this.usersList = data.filter(i=>{return i.id!=this.$root.$data.socket.id});
				}
			}
		},
		created :function(){
			this.$root.$on("loadUsers",this.loadUsers)
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
