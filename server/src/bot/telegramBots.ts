import { IBot } from "../interfaces";
import botHendler from "../services/bots";

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
