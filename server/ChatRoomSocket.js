const io = require('socket.io')(http);
class ChatRoom {
	constructor(options){
		this.options = {
			name: typeof options.name == "undefined" ? '' : options.name,
			events: typeof options.events == "undefined" ? [] : options.events,
		};
		this.ioApp = io
			.on('connection', this._onConnection.bind(this));
		
		
	}
	_onConnection(socket){
		try{
			let self = this;
			this.socket = socket;
			//this._createUser();
			log.info('client connected => ' + socket.id.toString());
			socket.on('disconnect', this._onDisconect.bind(this));
			socket.on('sendMessage', this._onSendMessage.bind(this));
			//socket.emit("userConnected",{"data":socket.id});
		}catch(e){
	    	log.error(e);
	    }
	}
	_onDisconect(reason){
			log.info('client disconnected => ' + this.socket.id.toString());
	}
	_onSendMessage(data){
		try{
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
	    }
	}
}

chatRoom = new ChatRoom({name: "chat-room"});
module.exports = chatRoom;