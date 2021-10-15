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
		const usersFiltered = this.users.filter(u=>{return u.id == data.from});
		const userData = usersFiltered[0];
		const message = {
			author:userData.userName,
			to:data.to.userName,
			message:data.msg,
			state:0,
			created_at:Date.now(),
			active:true,
			type:0,
		};
		try {
			
			if(usersFiltered.length > 0){	
				this._pushMessage(userData.userName,data.to.userName,message);
				this._pushMessage(data.to.userName,userData.userName,message);
			}
		}catch(e){
			console.log(e);
		}

	    log.info('message => ' + JSON.stringify(message));
	    socket.to(data.to.id).emit("receiveMessage",message);
	}
	_pushMessage(userName,roomId,message){
		connect(function(){
					const collection = client.db("chatroom").collection("chats");
					collection.findOne({ "_id": userName }).then(function(result){
						if(!result) {
			                throw new Error("No existe el usuario")
			            }
			            let room = result.rooms.filter(item=>{return item._id == roomId});
			            if(room.length > 0)
			            	collection.updateOne({ "_id": userName, "rooms._id":roomId }, {
					            "$push": {
					                "rooms.$.messages": message
					            }
					        });
			            else
			            {
			            	const room = {"_id": roomId, "messages":[message]};
			            	collection.updateOne({ "_id": userName }, {
					            "$push": {
					                "rooms": room
					            }
					        });
			            }
					}).catch(function(e){console.log(e)});
			        
				},function(e){console.log(e)});
	}
}

chatRoom = new ChatRoom();
module.exports = chatRoom;