import { client } from "_api";
import { chatAction } from "store/chat";

export const initData = () => {
  return async (dispatch: Function) => {
    try {
      const id = localStorage.getItem("chatId");
      if (id) {
        dispatch(chatAction.request());
        const { result } = await client("chat/conversation", {
          id: JSON.parse(id),
        });
        dispatch(chatAction.success([...result.conversation]));
      }
    } catch (err) {
      dispatch(chatAction.failure(err.message));
    }
  };
};
