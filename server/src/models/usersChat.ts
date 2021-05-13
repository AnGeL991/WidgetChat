import { model, Schema } from "mongoose";
import { IChat, IChatModel } from "../interfaces/userChat";

const UserChatSchema = new Schema({
  user: { type: String },
  conversation: [
    {
      client: { type: Boolean },
      message: { type: String },
      time: { type: String },
    },
  ],
});

UserChatSchema.statics.addNewChat = async function (props) {
  try {
    const newChat = new this(props);
    return await newChat.save();
  } catch (err) {
    throw new Error(err.message);
  }
};
UserChatSchema.statics.deleteChat = async function (chatId) {
  try {
    return await this.findByIdAndDelete({ chatId });
  } catch (err) {
    throw new Error(err.message);
  }
};
UserChatSchema.statics.getChat = async function (chatId) {
  try {
    return await this.findOne({ _id: chatId });
  } catch (err) {
    throw new Error(err.message);
  }
};
UserChatSchema.statics.updateChat = async function (id, msg) {
  try {
    return await this.findOneAndUpdate(
      { _id: id },
      { $addToSet: { conversation: [msg] } }
    );
  } catch (err) {
    throw new Error(err.message);
  }
};

export const ChatModel = model<IChat, IChatModel>("Chat", UserChatSchema);
export default ChatModel;
