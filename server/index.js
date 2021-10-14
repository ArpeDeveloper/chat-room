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

app.get("/chats", (request, response) => {
    try {
        let result = await collection.findOne({ "_id": request.query.room });
        response.send(result);
    } catch (e) {
        response.status(500).send({ message: e.message });
    }
});

http.listen(process.env.PORT, function(){		
		chat.connect();
		log.info('listening on *:' + process.env.PORT.toString());
	
});
