import { IConversation, ChatType } from "./types";

const { SET_CONVERSATION, SET_READED } = ChatType;

export const selector = (type: any, payload?: any) => ({
  type,
  payload,
});

export const setConversation = (conversation: IConversation[]) =>
  selector(SET_CONVERSATION, conversation);
export const setReadedMessage = () => selector(SET_READED);
