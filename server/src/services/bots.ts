import { SettingsModel } from "../models/settings";
import TelegramBot from "node-telegram-bot-api";

class botHendler {
  async getSettings() {
    try {
      return await SettingsModel.findOne();
    } catch (err) {
      return console.log(err.message);
    }
  }

  createNewBot(bot: string) {
    return {
      bot: new TelegramBot(bot, { polling: true }),
      isBusy: false,
      clientId: "",
    };
  }
}

export default botHendler;
