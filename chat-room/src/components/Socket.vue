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
				port: '3001',
				log: true,
				socketUrl: "192.168.50.25:3001"//process.env.SOCKET_URL + ":" + this.port
			}
		},
		methods:{
			connect: function(){
				try{
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