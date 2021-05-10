import { client } from "_api";
import { IConversation } from "store/chat";

export const ActionChatInDB = async (
  conversation: IConversation,
  clientId?: string
) => {
  try {
    const result = localStorage.getItem("ChatId");
    if (result) {
      const id = JSON.parse(result);
      const chat = await client("chat", { id, conversation }, "", {
        method: "PUT",
      });
      console.log(chat);
      if (chat.result === null) {
        const {
          result: { _id },
        } = await client("chat", { conversation, clientId });
        localStorage.setItem("ChatId", JSON.stringify(_id));
      }
    }
  } catch (err) {
    console.log(err.message);
  }
};
