<template>
	<div class="login row justify-content-md-center">
		<div class="col-lg-4 shadow p-3 mt-5 bg-body rounded">
			<form v-on:submit.prevent="submit">
				<div class="mb-3">
					<label for="userName" class="form-label">Usuario</label>
					<input v-on:change="userName=$event.target.value"  type="text" class="form-control" id="userName" aria-describedby="userNameHelp">
					<div id="userNameHelp" class="form-text">Tu nombre de usuario se mostrará a los demás</div>
				</div>
				<button type="submit" class="btn btn-primary">Conectarse</button>
			</form>
		</div>

	<Socket/>
	</div>
</template>

<script>

	import Socket from './Socket.vue'
	export default {
		name: 'Login',
		components:{
			Socket
		},
		props: {
			//error: String,
		},
		data:function(){
			return {
				error: null,
				userName: ""
			}
		},
		methods:{
			submit: function(){
				//Socket.methods.connect();
				this.$children[0].connect()
				this.$root.$emit("logged");
				this.$root.$data.userName = this.userName;

			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
