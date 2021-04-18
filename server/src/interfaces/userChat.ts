import { Document, Model } from "mongoose";

export interface IConversation {
  client: boolean;
  message: string;
  time: number;
}

export interface IChat extends Document {
  user: string;
  conversation: Array<IConversation>;
}
export interface IChatModel extends Model<IChat> {
  addNewChat(chat: IChat): Promise<void>;
  deleteChat(chatId: string): Promise<void>;
  getChat(chatId: string): Promise<void>;
  updateChat(chatId: string, conversation: IConversation): Promise<void>;
}
