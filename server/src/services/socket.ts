import { Socket, Server } from "socket.io";
import * as botProcessor from "../bot";
import { IBot, ICurrentUser } from "../interfaces";
const {
  Bots,
  joinToRoom,
  addBotToUser,
  allBotsInUse,
  addBotToRoom,
  sendDiscounectId,
  startBotsListen,
} = botProcessor;

let bots: IBot[] = new Array();
let TELEGRAM_ID = "";
let socketUsers = new Array();

class SocketHandler {
  io: Server;
  constructor(io: Server) {
    this.io = io;
  }

  _runAllFunctionsOnEvent(
    event: string,
    io: Server,
    socket: Socket,
    currentUser: ICurrentUser,
    props?: { message: string; id: string }
  ) {
    switch (event) {
      case "join": {
        joinToRoom(socketUsers, socket, currentUser);
        break;
      }
      case "message": {
        if (props) {
          allBotsInUse(io, currentUser, bots);
          addBotToUser(props.message, currentUser, TELEGRAM_ID, bots);
        }
        break;
      }
      case "disconnect": {
        sendDiscounectId(currentUser, TELEGRAM_ID, bots);
        break;
      }
      default: {
        return;
      }
    }
  }

  init() {
    this.io.on("connection", (socket: Socket) => {
      let currentUser: ICurrentUser = { name: "", room: "" };
      socket.on("join", (user: ICurrentUser) => {
        const { name, room } = user;
        currentUser = { name, room };
        this._runAllFunctionsOnEvent("join", this.io, socket, user);
      });

      socket.on("message", (message: string, id: string) => {
        console.log(currentUser, socketUsers);
        this._runAllFunctionsOnEvent("message", this.io, socket, currentUser, {
          message,
          id,
        });
      });

      socket.on("disconnect", () => {
        this._runAllFunctionsOnEvent(
          "disconnect",
          this.io,
          socket,
          currentUser
        );
      });
    });
  }
}

export const startChat = async (io: Server) => {
  try {
    const socketHendler = new SocketHandler(io);
    const res = await Bots();
    if (res) {
      bots = res.bot;
      TELEGRAM_ID = res.TELEGRAM_ID;
    }
    if (bots.length > 0) {
      socketHendler.init();
      addBotToRoom(bots, socketUsers);
      startBotsListen(io, bots);
    }
  } catch (err) {
    console.log(err.message);
  }
};
