<template>
	<div class="container" id="app">
		<!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
		<div id="loader" class="w-100 h-100 text-center position-absolute bg-white">

			<div class="spinner-border" role="status">
				<span class="visually-hidden">Cargando...</span>
			</div>
		</div>
		<div v-if="socketOn">
			<div v-if="logged" class="login row justify-content-md-center mt-3">
				<div class="col-lg-8">
					<p class="mb-1">
						<strong v-if="currentUserNameChat">{{ currentUserNameChat }}</strong>
						<strong v-else>Selecciona un usuario de la lista para comenzar a chatear</strong>
					</p>
					<Chat v-if="currentUserNameChat"/>
				</div>
				<div class="col">
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
		this.$root.$data.logged = false;
		this.$root.$data.userName = "";
		this.$root.$data.currentSocketData = null;
		this.$root.$data.usersList = [];
		this.$root.$on("logged",function(){this.logged = true}.bind(this));
		this.$loadScript("http://192.168.50.25:3001/socket.io/socket.io.js")
		.then(function(){
			this.socketOn = true;
		}.bind(this)).catch(function(e){
			console.log(e);
			this.socketOn = false;
		}.bind(this)).finally(function(){document.getElementById("loader").style.display = "none"});
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
