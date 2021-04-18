import express from "express";
import path from "path";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectToDb } from "./database";
import { startChat } from "./services";
import router from "./routes";
const app = express();

connectToDb();

app.use(express.static(path.join("../client/build")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/api", router);
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "../../../client/build/index.html"));
});

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: { origin: "*:*", methods: ["GET", "POST"] },
});

startChat(io);

httpServer.listen(80, () => console.log(`server is connect on port:80`));
