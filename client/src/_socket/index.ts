import { io } from "socket.io-client";
import { prepareUser } from "_helpers";

export const socket = io("http://localhost:8080", {
  transports: ["websocket"],
});

export const configureSocket = () => {
  const user = prepareUser();
  console.log(user);
  socket.on("connect", () => {
    console.log("connected");
    socket.emit("join", { name: user.name, room: user.room });
  });
};
