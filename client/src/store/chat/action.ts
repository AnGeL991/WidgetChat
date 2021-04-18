import { IConversation, ChatType } from "./types";

const { SET_CONVERSATION } = ChatType;

export const selector = (type: any, payload?: any) => ({
  type,
  payload,
});

export const setConversation = (conversation: IConversation[]) =>
  selector(SET_CONVERSATION, conversation);
