require('dotenv').config();
const fs = require( 'fs' );
const express = require( 'express' );
app = express(),
http = require('http').createServer(app),
log = require('./logger.js'),
require('./ChatRoomSocket.js');

app.get('/', function(req, res){
	res.send('<h1>Server running</h1>');
});

http.listen(process.env.PORT, function(){
	log.info('listening on *:' + process.env.PORT.toString());
});
