import { Server } from "socket.io";

export default function setupSockets(io: Server) {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("invoice:update", (data) => {
      // broadcast to others
      socket.broadcast.emit("invoice:updated", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}