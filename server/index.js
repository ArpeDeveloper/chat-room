require('dotenv').config();
const fs = require( 'fs' );
const express = require( 'express' );
const cors = require("cors");
app = express(),
http = require('http').createServer(app),
log = require('./logger.js');
const { MongoClient } = require('mongodb');
collection = null;
client = null;
connect = function(success,error) {
   //if (con) return con; // return connection if already conncted
   client = new MongoClient(process.env.MONGO_URI.replace("<password>",process.env.MONGO_PASS), { 
		useNewUrlParser: true, useUnifiedTopology: true,
   });
   con = client.connect().then(success).catch(error)
   //return con;
}
const chat = require('./ChatRoomSocket.js');


//app.use(cors());


app.get('/', function(req, res){
	res.send('<h1>Server running</h1>');
});

app.get("/chats/:userName/:room", (request, response) => {
    try {
    	const data = request.params
        connect(function(){
			const collection = client.db("chatroom").collection("chats");
			collection.findOne({ "_id": data.userName }).then(function(result){
				if(!result) {
	                throw new Error("No existe el usuario")
	            }
	            let room = result.rooms.filter(item=>{return item._id == data.room});
	            if(room.length > 0){
	            	console.log(JSON.stringify(room));
	            	response.send(room[0].messages ? room[0].messages : []);
	            }
	            else
	            {
	            	const room = {"_id": data.room, "messages":[]};
	            	collection.updateOne({ "_id": data.userName }, {
			            "$push": {
			                "rooms": room
			            }
			        });
			        response.send(room.messages);
	            }
			}).catch(function(e){console.log(e)});
            
		},function(e){console.log(e)});
        
    } catch (e) {
        response.status(500).send({ message: e.message });
    }
});

http.listen(process.env.PORT, function(){		
		chat.connect();
		log.info('listening on *:' + process.env.PORT.toString());
	
});
