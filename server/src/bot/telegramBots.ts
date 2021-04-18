import TelegramBot from "node-telegram-bot-api";
import fetch from "node-fetch";
import { IBot } from "../interfaces";
import { config } from "../config";

export const Bots = async () => {
  const settings = await fetch(`${config.url}/api/bot`);
  const { result } = await settings.json();
  const bot: IBot[] = new Array();
  if (!result) throw new Error("can't fetch settings");
  if (result) {
    let TELEGRAM_ID = result.telegram_id;
    for (let i in result.bots) {
      bot.push({
        bot: new TelegramBot(result.bots[i], { polling: true }),
        isBusy: false,
        clientId: "",
      });
    }
    return { bot, TELEGRAM_ID };
  }
};
