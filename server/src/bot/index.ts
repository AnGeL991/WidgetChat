import botHendler from "../services/bots";
import { Socket, Server } from "socket.io";
import { IBot, ICurrentUser } from "../interfaces";

export const Bots = async () => {
  const services = new botHendler();

  const settings = await services.getSettings();
  if (!settings) throw new Error("Can't get settings from db");

  const bot: IBot[] = new Array();

  let TELEGRAM_ID = settings.telegram_id;
  for (let i in settings.bots) {
    bot.push(services.createNewBot(settings.bots[i]));
  }
  return { bot, TELEGRAM_ID };
};

export const joinToRoom = (
  socketUsers: Array<any>,
  socket: Socket,
  user: ICurrentUser
) => {
  const { name, room } = user;
  socket.join(room);
  const exist = socketUsers.find((el) => el.name === name);
  if (!exist) {
    socketUsers.push(user);
  }
};

export const addBotToRoom = (
  bots: IBot[],
  socketUsers: Array<{ name: string; room: string }>
) => {
  for (let i in bots) {
    bots[i].bot.onText(/\/chats/, (msg, match) => {
      const chatId = msg.chat.id;
      const keyboard = socketUsers.map((el) => [
        { text: "/sendTo " + el.name },
      ]);
      bots[i].bot.sendMessage(chatId, "Users list", {
        reply_markup: {
          resize_keyboard: true,
          keyboard,
        },
      });
    });
    bots[i].bot.onText(/\/sendTo (.+)/, (msg, match) => {
      const chatId = msg.chat.id;
      if (match) {
        const chat = socketUsers.find((el) => el.name === match[1]);
        if (chat) {
          prepareBot(
            bots[i],
            chatId,
            `Connect To user ${chat.name + " (" + chat.room + ")"}`,
            true,
            chat
          );
        } else {
          prepareBot(bots[i], chatId, "User doesn't exist");
        }
      }
    });
    break;
  }
};

export const allBotsInUse = (
  io: Server,
  currentUser: ICurrentUser,
  bots: IBot[]
) => {
  const freeBots = bots.find((el) => el.isBusy === false);
  if (!freeBots) {
    io.to(currentUser.room).emit(
      "response",
      "Please wait, all support is busy"
    );
  }
};
export const addBotToUser = (
  message: string,
  currentUser: ICurrentUser,
  telegram_id: string,
  bots: IBot[]
) => {
  for (let i in bots) {
    if (bots[i].room === currentUser.room) {
      bots[i].bot.on;
      prepareBot(bots[i], telegram_id, message, true, currentUser);
      break;
    }
    if (!bots[i].isBusy) {
      prepareBot(bots[i], telegram_id, message, true, currentUser);
      break;
    } else if (bots[i].isBusy && bots[i].clientId === currentUser.name) {
      prepareBot(bots[i], telegram_id, message);
      break;
    }
  }
};

const prepareBot = (
  bots: IBot,
  telegram_id: string | number,
  message: string,
  busy?: boolean,
  currentUser?: ICurrentUser
) => {
  if (currentUser) {
    bots.clientId = currentUser.name;
    bots.room = currentUser.room;
  }
  if (busy) {
    bots.isBusy = true;
  }

  bots.bot.sendMessage(telegram_id, message);
};

export const sendDiscounectId = (
  currentUser: ICurrentUser,
  telegram_id: string,
  bots: IBot[]
) => {
  for (let i in bots) {
    if (bots[i].clientId === currentUser.name) {
      prepareBot(
        bots[i],
        telegram_id,
        `user ${currentUser.name} leave from the page`,
        false
      );
    }
  }
};

export const startBotsListen = (io: Server, bots: IBot[]) => {
  for (let i in bots) {
    bots[i].bot.on("message", (msg) => {
      if (msg.text?.includes("/chat")) return;
      if (msg.text?.includes("/sendTo")) return;
      if (!msg) return;
      bots[i].isBusy ? io.to(bots[i].room).emit("response", msg.text) : null;
    });
  }
};
