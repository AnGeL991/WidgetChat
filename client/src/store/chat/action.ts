import { IConversation, ChatType } from "./types";

const {
  SET_CONVERSATION,
  SET_READED,
  LOAD_REQUEST,
  END_REQUEST,
  FAILURE_REQUEST,
} = ChatType;

export const selector = (type: any, payload?: any) => ({
  type,
  payload,
});

export const setConversation = (conversation: IConversation[]) =>
  selector(SET_CONVERSATION, conversation);
export const request = () => selector(LOAD_REQUEST);
export const success = (data: IConversation[]) => selector(END_REQUEST, data);
export const failure = (error: string) => selector(FAILURE_REQUEST, error);

export const setReadedMessage = () => selector(SET_READED);
