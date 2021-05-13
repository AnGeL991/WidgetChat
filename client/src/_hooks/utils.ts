import { client } from "_api";
import { IConversation } from "store/chat";

export const ActionChatInDB = async (
  conversation: IConversation,
  clientId?: string
) => {
  try {
    const result = localStorage.getItem("chatId");
    if (result) {
      const id = JSON.parse(result);
      await client("chat", { id, conversation }, "", {
        method: "PUT",
      });
    }
    if (!result) {
      const {
        result: { _id },
      } = await client("chat", { conversation });
      localStorage.setItem("chatId", JSON.stringify(_id));
    }
  } catch (err) {
    console.log(err.message);
  }
};
