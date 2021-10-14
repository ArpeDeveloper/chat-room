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
					this.socket = window.io(this.socketUrl);
					this.socket.on('connect', this._onConnectSocket.bind(this))
						.on('disconnect', this._onDisconnectSocket.bind(this))
						.on("geonotify", this._receiveMessage.bind(this))
						.on("userConnected", this._loadUsers.bind(this))
				}catch(e){
					console.error(e.toString());
				}
			},
			_onConnectSocket: function(socket){
				console.log(socket)
				this.socket.emit("userConnected",{id:this.socket.id,userName:this.$root.$children[0].$data.userName});
			},
			_onDisconnectSocket: function(socket){
				console.log(socket)
			},
			_receiveMessage: function(data){
				console.log(data)
				var defaultData = {
					type: "",
					message: "",
					extra: {}
				},
				finalData = defaultData;//$.extend(true, defaultData, data);
				try{
					switch(finalData.type){
						case "notify":
							if(finalData.message != "")
								this._notify(finalData.message,finalData.extra);
						break;
						case "refreshMap":
							this._refreshMap(finalData.extra);
						break;
						case "info":
							this._info(finalData.extra);
						break;
						case "autoLayer":
							if(finalData.message != "")
								//this._notify(finalData.message,finalData.extra);
								this._autoLayer(finalData.extra);
							break;
						case "tracking":
								this._tracking(finalData.extra);
							break;
					}
					this._notifications(finalData);
				}catch(e){
					this._log(e.toString(),this.typeErrorLog);
				}
			},
			_loadUsers: function(data){
				this.$root.$emit("loadusers",data)
			}
		}
	}
</script>