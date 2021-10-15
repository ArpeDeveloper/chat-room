<template>

	<div class="container h-100" id="app">
		<nav v-if="logged" class="navbar navbar-light bg-light fixed-top">
			<div class="container-fluid">
				<a class="navbar-brand" href="#">Chat <strong v-if="currentUserNameChat">- {{ currentUserNameChat }}</strong></a>
				<button class="navbar-toggler d-lg-none d-xl-block" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
					<div class="offcanvas-header">
						<h5 class="offcanvas-title" id="offcanvasNavbarLabel">Usuarios</h5>
						<button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
					</div>
					<div class="offcanvas-body">
						<Users/>
					</div>
				</div>
			</div>
		</nav>
		<!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
		<div id="loader" class="w-100 h-100 text-center position-absolute bg-white">

			<div class="spinner-border" role="status">
				<span class="visually-hidden">Cargando...</span>
			</div>
		</div>
		<div v-if="socketOn" class="row h-100 pt-5">
			<div v-if="logged" class="row pt-3 h-100 m-0">
				<div class="col-12 col-lg-8 h-75">
					<strong v-if="!currentUserNameChat">Seleccione un usuario para comenzar a chatear</strong>
					<Chat v-if="currentUserNameChat"/>
				</div>
				<div class="col h-auto d-none d-lg-block d-xl-none">
					<p class="mb-1"><strong>Usuarios conectados:</strong></p>
					<Users/>
				</div>
			</div>
			<Login v-else/>
		</div>
		<div v-else class="alert alert-danger mt-3" role="alert">
			Lo siento no puedes chatear, inténtalo más tarde.
		</div>
	</div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import Login from './components/Login.vue'
import Users from './components/Users.vue'
import Chat from './components/Chat.vue'

export default {
	name: 'App',
	components: {
		Login,
		Chat,
		Users
    //HelloWorld
	},
	data:function(){
		return {
			logged: false,
			socketOn:false,
			currentUserNameChat: null
		}
	},
	methods:{
	},
	mounted(){
		this.$root.$data.apiBaseUrl = process.env.VUE_APP_API_HOST + ":" + process.env.VUE_APP_API_PORT;
		this.$root.$data.logged = false;
		this.$root.$data.userName = "";
		this.$root.$data.currentSocketData = null;
		this.$root.$data.usersList = [];
		this.$root.$data.showLoader = function(){
			document.getElementById("loader").style.display = "block"
		};
		this.$root.$data.hideLoader = function(){
			document.getElementById("loader").style.display = "none"
		};
		this.$root.$on("logged",function(){this.logged = true}.bind(this));
		this.$loadScript("http://192.168.50.25:3001/socket.io/socket.io.js")
		.then(function(){
			this.socketOn = true;
		}.bind(this)).catch(function(e){
			console.log(e);
			this.socketOn = false;
		}.bind(this)).finally(this.$root.$data.hideLoader);
		this.$root.$on("loadCurrentSocketData",function(){
			this.currentUserNameChat = this.$root.$data.currentSocketData ? this.$root.$data.currentSocketData.userName : null;
		}.bind(this))
	}
}
</script>

<style scoped>
	#loader{
		z-index: 1;
	}
	#app{
		position: relative;
	}
</style>
