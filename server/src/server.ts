import express from "express";
import server from "./services/server";

const app = express();

server.config(app);

server.addRouting(app);

const httpServer = server.createHttp(app);

server.addChatLogic(httpServer);

server.startServer(httpServer);
