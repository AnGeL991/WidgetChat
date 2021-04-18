import TelegramBot from "node-telegram-bot-api";

export interface IBot {
  bot: TelegramBot;
  isBusy: boolean;
  clientId: string;
}
