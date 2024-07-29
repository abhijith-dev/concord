require('./config/env');

import express, { Application } from 'express';
import http, { Server } from 'http';
import https from 'https';
import helmet from 'helmet';
import cors from 'cors';
import { Server as SocketSever } from "socket.io";

import { database } from './config/db';
import AppRouter from './routes/index';
import UserRouter from './routes/users';
import RoomRouter from './routes/rooms';

import { version } from './utils/index';
import { createRoom,joinRoom } from './functions/DbOperations';

const app: Application = express();

// Express Middlewares
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.use(express.json());

let server:Server;

app.use(`/api/${version}/`,AppRouter);
app.use(`/api/${version}/users`,UserRouter)
app.use(`/api/${version}/rooms`,RoomRouter)


if(process.env.NODE_ENV === 'production'){
   server = https.createServer(app);
}
else{
  server = http.createServer(app);
}

const io = new SocketSever(server, {
  cors: {
    origin: "http://localhost:3006",
    methods: ["POST","GET"]
  }
});

io.on("connection",(connection)=>{
       connection.on("room_create",async (payload)=> {
        const { room_id } = payload;
         connection.join(room_id);
         await createRoom(payload);
       });

       connection.on("join_room",async(payload) => {
        const { room_id } = payload;
         connection.join(room_id);
         await joinRoom(payload)
       });

       connection.on("send_message",(payload:any)=>{
        const { room_id }= payload;
         connection.to(room_id).emit("recieve_message",{
           ...payload
         });
       });
})

 
// Start the server
const port = process.env.PORT || 8000;
server.listen(port, async () => {
  console.log(`Server is listening on port ${port}`);
  await database.connection();
});



