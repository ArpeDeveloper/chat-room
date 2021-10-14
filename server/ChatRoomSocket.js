const io = require('socket.io')(http);
class ChatRoom {
	constructor(){
		this.users = [];
		
		
		
	}
	connect(){
		this.ioApp = io
			.on('connection', this._onConnection.bind(this));
	}
	_onConnection(socket){
		try{
			let this_ = this;
			this.socket = socket;
			//this._createUser();
			log.info('client connected => ' + socket.id.toString());
			socket.on('disconnect', this._onDisconect.bind(this,socket));
			socket.on('sendMessage', this._onSendMessage.bind(this,socket));
			socket.on('registerUser', function(data){
				connect(function(){
					const collection = client.db("chatroom").collection("chats");
					collection.findOne({ "_id": data.userName }).then(function(result){
						if(!result) {
			                collection.insertOne({ "_id": data.userName, rooms: [] });
			            }
					}).catch(function(e){console.log(e)});
		            
				},function(e){console.log(e)});
				
				log.info('user connected => ' + JSON.stringify(data));
				this_.users.push(data);
				this_.ioApp.emit("loadUsers",this_.users);

			});
			//socket.emit("userConnected",{"data":socket.id});
		}catch(e){
	    	log.error(e);
	    }
	}
	_onDisconect(socket,reason){
		let this_ = this;
			log.info('client disconnected => ' + socket.id.toString());
			this.users = this.users.filter(function(user){
				return user.id != socket.id;
			});
			this.ioApp.emit("loadUsers",this.users);
	}
	_onSendMessage(socket,data){
		/*try{
			var url = process.env.WS_URL + process.env.WS_SOCKET_URL;
			var xhr = new XMLHttpRequest();
	        xhr.open('put', url, true);
	        xhr.setRequestHeader('Content-Type', 'application/json');
	        xhr.setRequestHeader('token', this.token);

	        xhr.onload = function () {
	            if (xhr.status == 200) {
	            	log.info("Sesión asignada");
	            } else {
	            	log.error("Error al crear la Sesión: " + xhr.responseText.toString());
	            }
	        };
	        xhr.send(JSON.stringify({sid:this.socket.id,nsp:nsp}));
	    }catch(e){
	    	log.error(e);
	    }*/
	    log.info('message => ' + JSON.stringify(data));
	    socket.to(data.to.id).emit("receiveMessage",data);
	}
}

chatRoom = new ChatRoom();
module.exports = chatRoom;