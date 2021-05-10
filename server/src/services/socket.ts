import { Socket, Server } from "socket.io";
import { Bots } from "../bot/telegramBots";
import { IBot } from "../interfaces";

let bots: IBot[] = new Array();
let TELEGRAM_ID = "";

class SocketHandler {
  io: Server;
  constructor(io: Server) {
    this.io = io;
  }

  _runAllFunctionsOnEvent(
    event: string,
    io: Server,
    socket: Socket,
    props?: { message: string; id: string }
  ) {
    switch (event) {
      case "message": {
        if (props) {
          allBotsInUse(io, props.id);
          addBotToUser(props.message, props.id);
        }
        break;
      }
      case "disconnect": {
        sendDiscounectId(socket.id);
      }
    }
  }

  // addToEvenet(event, middleware) {}

  init() {
    this.io.on("connection", (socket: Socket) => {
      socket.on("message", (message: string, id: string) => {
        this._runAllFunctionsOnEvent("message", this.io, socket, {
          message,
          id,
        });
      });
      socket.on("disconnect", () => {
        this._runAllFunctionsOnEvent("disconnect", this.io, socket);
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
      startBotsListen(io);
    }
  } catch (err) {
    console.log(err.message);
  }
};

const allBotsInUse = (io: Server, id: string) => {
  const freeBots = bots.find((el) => el.isBusy === false);
  if (!freeBots) {
    console.log("zajęte", id);
    io.to(id).emit(
      "response",
      "Przepraszamy ale wszyscy pracownicy sa teraz zajęci"
    );
  }
};
const addBotToUser = (message: string, id: string) => {
  console.log(message, id);
  for (let i in bots) {
    if (!bots[i].isBusy) {
      bots[i].clientId = id;
      bots[i].isBusy = true;
      bots[i].bot.sendMessage(TELEGRAM_ID, message);
      break;
    }
    if (bots[i].isBusy && bots[i].clientId === id) {
      console.log(id, bots);
      bots[i].bot.sendMessage(TELEGRAM_ID, message);
      break;
    }
  }
};
const sendDiscounectId = (id: string) => {
  for (let i in bots) {
    if (bots[i].clientId === id) {
      bots[i].isBusy = false;
      bots[i].bot.sendMessage(TELEGRAM_ID, `user ${id} leave from the page`);
    }
  }
};

const startBotsListen = (io: Server) => {
  for (let i in bots) {
    bots[i].bot.on("message", (msg) => {
      if (!msg) return;
      bots[i].isBusy
        ? io.to(bots[i].clientId).emit("response", msg.text)
        : null;
    });
  }
};
