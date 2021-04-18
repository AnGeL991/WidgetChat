import { Socket, Server } from "socket.io";
import { Bots } from "../bot/telegramBots";
import { IBot } from "../interfaces";

let bots: IBot[] = new Array();
let TELEGRAM_ID = "";

export const startChat = async (io: Server) => {
  try {
    const res = await Bots();
    if (res) {
      bots = res.bot;
      TELEGRAM_ID = res.TELEGRAM_ID;
    }
    if (bots.length > 0) {
      startSocket(io);
      startBotsListen(io);
    }
  } catch (err) {
    console.log(err.message);
  }
};

const allBotsInUse = (io: Server, id: string) => {
  const freeBots = bots.find((el) => el.isBusy === false);
  if (!freeBots) {
    io.to(id).emit(
      "response",
      "Przepraszamy ale wszyscy pracownicy sa teraz zajęci"
    );
  }
};

const startSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    socket.on("message", (message: string, id: string) => {
      allBotsInUse(io, socket.id);
      for (let i in bots) {
        if (!bots[i].isBusy) {
          bots[i].clientId = socket.id;
          bots[i].isBusy = true;
          bots[i].bot.sendMessage(TELEGRAM_ID, message);
          break;
        }
        if (bots[i].isBusy && bots[i].clientId === socket.id) {
          console.log(socket.id, bots);
          bots[i].bot.sendMessage(TELEGRAM_ID, message);
          break;
        }
      }
    });

    socket.on("disconnect", () => {
      for (let i in bots) {
        if (bots[i].clientId === socket.id) {
          bots[i].isBusy = false;
          bots[i].bot.sendMessage(
            TELEGRAM_ID,
            `user ${socket.id} leave from the page`
          );
        }
      }
    });
  });
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
