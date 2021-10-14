<template>
	<div class="chat h-100 mw-100">
		<div class="row border border-1 border-primary h-100 w-100 overflow-auto">
			<div id="chat" class="col">
				
			</div>
		</div>
		<form v-on:submit.prevent="submit" class="row w-100">
			<div class=" col-md-10 p-0">
				<textarea  class="form-control" id="msgText" />
			</div>
			<div class=" col-lg-2 p-0">
				<button type="submit" class="btn btn-primary btn-block h-100 w-100">Enviar</button>
			</div>
		</form>
	</div>
</template>

<script>
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
				const msgText = document.getElementById("msgText").value;
				const data = {from:this.$root.$data.socket.id,to:this.$root.$data.currentSocketData,msg:msgText};
				this.$root.$data.socket.emit("sendMessage",data);
				this.renderOwnMessage(data)
			},
			receiveMessage:function(data){
				if(data.to.id == this.$root.$data.socket.id){
					if(data.from == this.$root.$data.currentSocketData.id){
						this.renderNewMessage(data);
					}else{
						alert("otro chat")
					}
				}
			},
			renderNewMessage: function(data){
				const html = '<div class="float-start card w-auto m-1">'
							+ '<div class="row g-0">'
							+'    <div class="col-md-1">'
							+'      <img src="'+ require('../assets/user.png') +'" class="img-fluid rounded-circle img-thumbnail" alt="usuario">'
							+'    </div>'
							+'    <div class="col-md-11">'
							+'      <div class="card-body">'
							+'        <p class="card-text text-start">'+data.msg+'</p>'
							+'      </div>'
							+'   </div>'
							+'  </div>'
							+'</div>';
				document.getElementById("chat").innerHTML +=html
			},
			renderOwnMessage: function(data){
				const html = '<div class="float-end card w-auto m-1">'
							+ '<div class="row g-0">'
							+'    <div class="col">'
							+'      <div class="card-body">'
							+'        <p class="card-text text-end">'+data.msg+'</p>'
							+'      </div>'
							+'   </div>'
							+'    <div class="col-md-1">'
							+'      <img src="'+ require('../assets/user.png') +'" class="img-fluid rounded-circle img-thumbnail" alt="usuario">'
							+'    </div>'
							+'  </div>'
							+'</div>';
				document.getElementById("chat").innerHTML +=html
			}
		},
		mounted: function(){
			this.$root.$on("receiveMessage",this.receiveMessage)
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
