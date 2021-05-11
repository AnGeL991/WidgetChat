import express, { Response, Request } from "express";
import path from "path";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectToDb } from "../database";
import { startChat } from "../services/socket";
import router from "../routes";

class server {
  static config(app: any) {
    connectToDb();
    app.use(express.static(path.join("../client/build")));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(cors());
  }
  static addRouting(app: any) {
    app.use("/api", router);
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(
        path.join(__dirname + "../../../../client/build/index.html")
      );
    });
  }

  static createHttp(app: any) {
    return createServer(app);
  }

  static addChatLogic(httpServer: any) {
    const io = new Server(httpServer, {
      cors: { origin: "*:*", methods: ["GET", "POST"] },
    });
    startChat(io);
  }

  static startServer(httpServer: any) {
    httpServer.listen(8080, () =>
      console.log(`server is connect on port:8080`)
    );
  }
}
export default server;
