<template>
	<div class="socket"></div>
</template>
<script>
	export default {
		name: 'Socket',
		props: {
			//error: String,
		},
		data:function(){
			return {
				port: process.env.VUE_APP_SOCKET_PORT,
				log: true,
				host: process.env.VUE_APP_SOCKET_HOST
			}
		},
		methods:{
			connect: function(){
				try{
					this.socketUrl = this.host + ":" + this.port;
					this.$root.$data.socket = this.socket = window.io(this.socketUrl)
						.on('disconnect', this._onDisconnectSocket.bind(this))
						.on("receiveMessage", this._receiveMessage.bind(this))
						.on("loadUsers", this._loadUsers.bind(this))
						.on('connect', this._onConnectSocket.bind(this))
				}catch(e){
					console.error(e.toString());
				}
			},
			_onConnectSocket: function(){
				this.socket.emit("registerUser",{id:this.socket.id,userName:this.$root.$data.userName});
			},
			_onDisconnectSocket: function(socket){
				console.log(socket)
			},
			_receiveMessage: function(data){
				this.$root.$emit("receiveMessage",data);
			},
			_loadUsers: function(data){
				this.$root.$emit("loadUsers",data)
			}
		}
	}
</script>