import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io"; // Import the correct named export
import next from "next";

const app = next({ dev: true });
const handle = app.getRequestHandler();

const server = express();
const httpServer = http.createServer(server);
const io = new SocketIOServer(httpServer, { // Use the imported named export
  cors: {
    origin: '*',
  },
});

app.prepare().then(() => {
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('message', (data) => {
      console.log('Received message:', data);
      // Broadcasting the message to all connected clients
      io.emit('message', data);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  const PORT = process.env.PORT || 3000;
  httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
