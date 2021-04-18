import { client } from "_api";
import { chatAction } from "store/chat";

export const initData = () => {
  return async (dispatch: Function) => {
    try {
      const id = localStorage.getItem("ChatId");
      if (id) {
        const { result } = await client("chat/conversation", {
          id: JSON.parse(id),
        });
        console.log(result);
        dispatch(chatAction.setConversation([...result.conversation]));
      }
    } catch (err) {
      console.log(err.message);
    }
  };
};
