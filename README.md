# chat-room
Es una pequeña aplicación web que permite intercambiar mensajes entre usuarios de la misma red en tiempo real

Se utilizaron las siguientes tecnologías:
* Vue.js
* Node.js
* Socket.io
* MongoDB
* Bootstrap

La carpeta **server** contiene el el servidor node.js que se uso como backend para esta aplicacion. El servidor se encarga de la conexión a la base de datos y tambien de la inicializacion del socket.
Para iniciar el servidor backend usa el comando:
```
node index.js
```

La carpeta **chat-room** contiene el proyecto Vue que se creó para el front end.
Para iniciar el servidor de vue usa el comando:
```
npm run serve
```

La base de datos la nombre **chatroom** y debe tener una colección llamada **chats**

para instalar las librerías se utilizó npm, usa el siguiente comando para configurarlas
```
npm install
```

