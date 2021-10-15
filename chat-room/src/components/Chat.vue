<template>
	<div class="chat h-100 mw-100">
		<div class="row border border-1 border-primary h-75 w-100 overflow-auto m-0 p-2">
			<div id="chat" class="col">
				
			</div>
		</div>
		<form id="form-message" v-on:submit.prevent="submit" class="row m-0 w-100 pt-1 needs-validation">
			<div class=" col-lg-10 p-0">
				<textarea required=""  class="form-control" id="msgText" />
				<div class="invalid-feedback">
					Escribe un mensaje antes de presionar Enviar
				</div>
			</div>
			<div class=" col-lg-2 p-0">
				<button v-on:click.prevent="submit" type="submit" class="btn btn-primary btn-block h-100 w-100">Enviar</button>
			</div>
		</form>
	</div>
</template>

<script>
	import axios from "axios";

	export default {
		name: 'Chat',
		props: {
			//error: String,
		},
		data:function(){
			return {
			}
		},
		methods:{
			submit: function(){
				const textarea = document.getElementById("msgText");
				const msgText = textarea.value.trim();
				if(msgText.length <= 0){
					document.getElementById("form-message").classList.remove("needs-validation");
					document.getElementById("form-message").classList.add("was-validated");
					return false;
				}
				const data = {from:this.$root.$data.socket.id,to:this.$root.$data.currentSocketData,msg:msgText};
				this.$root.$data.socket.emit("sendMessage",data);
				this.renderOwnMessage({author:this.$root.$data.userName,to:data.to.userName,message:data.msg});
				textarea.value = "";
				document.getElementById("form-message").classList.add("needs-validation");
					document.getElementById("form-message").classList.remove("was-validated");
			},
			receiveMessage:function(data){
				if(data.author == this.$root.$data.userName){
					this.renderOwnMessage(data);
				}else{
					if(data.author == this.$root.$data.currentSocketData.userName){
						this.renderNewMessage(data);
					}else{
						alert("otro chat")
					}
				}
			},
			renderNewMessage: function(data){
				const d = new Date(data.created_at ? data.created_at : Date.now());
				const html = '<p class="w-100 m-0  float-start position-relative"><small class="text-muted">'+data.author+' - ' + d.toLocaleString()+'</small></p>'
				+'<div class="float-start  w-75 m-1 ">'
							+ '<div class="row g-0">'
							+'    <div class="col-2 col-md-1 align-self-center px-1">'
							+'      <img src="'+ require('../assets/user.png') +'" class="img-fluid rounded-circle img-thumbnail" alt="usuario">'
							+'    </div>'
							+'    <div class="card col-10 col-md-11 shadow-sm bg-body rounded border border-info">'
							+'      <div class="card-body p-1">'
							+'        <p class="m-0 card-text text-start">'+data.message+'</p>'
							+'      </div>'
							+'   </div>'
							+'  </div>'
							+'</div>';
				document.getElementById("chat").innerHTML +=html
			},
			renderOwnMessage: function(data){
				const d = new Date(data.created_at ? data.created_at : Date.now());
				const html = '<p class="w-100 m-0 float-end position-relative"><small class="float-end text-muted">'+data.author+' - ' + d.toLocaleString()+'</small></p>'
							+'<div class="float-end  w-75 m-1  ">'
							+ '<div class="row g-0">'
							+'    <div class="card col-10 col-md-11 shadow-sm bg-body rounded">'
							+'      <div class="card-body p-1">'
							+'        <p class="card-text text-start">'+data.message+'</p>'
							+'      </div>'
							+'   </div>'
							+'    <div class="col-2 col-md-1 align-self-center px-1">'
							+'      <img src="'+ require('../assets/user.png') +'" class="img-fluid rounded-circle img-thumbnail" alt="usuario">'
							+'    </div>'
							+'  </div>'
							+'</div>';
				document.getElementById("chat").innerHTML +=html
			},
			getChat: function(){
				document.getElementById("chat").innerHTML = "";
				this.$root.$data.showLoader();
				this.userName = this.$root.$data.userName;
				this.userNameChat = this.$root.$data.currentSocketData.userName;
				axios.get(this.$root.$data.apiBaseUrl + process.env.VUE_APP_API_GET_CHATS
						.replace("<userName>",this.userName)
						.replace("<userNameChat>",this.userNameChat)
				).then(this.loadChat).catch(this.error).finally(this.$root.$data.hideLoader);
			},
			loadChat: function(resp){
				resp.data.forEach(function(msg){
					this.receiveMessage(msg);
				}.bind(this));
			},
			error: function(){
				alert("No se pudieron cargar los mensajes del usuario " + this.userNameChat);
			},
		},
		mounted: function(){
			this.$root.$on("receiveMessage",this.receiveMessage)
			this.$root.$on("loadCurrentSocketData",this.getChat)
			this.getChat();
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
