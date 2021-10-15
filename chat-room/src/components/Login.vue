<template>
	<div class="login row justify-content-md-center m-0 pt-3">
		<div class="col-lg-4 shadow p-3 mt-5 bg-body rounded">
			<form id="form-login" v-on:submit.prevent="submit" class="needs-validation">
				<div class="mb-3">
					<label for="userName" class="form-label">Usuario</label>
					<input required=""  type="text" class="form-control" id="userName" aria-describedby="userNameHelp">
					<div id="userNameHelp" class="form-text">Tu nombre de usuario se mostrará a los demás</div>
					<div class="invalid-feedback">
						Escribe un nombre de usuario
					</div>
				</div>
				<button v-on:click.prevent="submit" type="submit" class="btn btn-primary">Conectarse</button>
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
				const input = document.getElementById("userName");
				const userName = input.value.trim();
				if(userName.length <= 0){
					document.getElementById("form-login").classList.remove("needs-validation");
					document.getElementById("form-login").classList.add("was-validated");
					return false;
				}
				this.$children[0].connect()
				this.$root.$emit("logged");
				this.$root.$data.userName = this.userName = userName;

			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
