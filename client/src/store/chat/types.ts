export interface IConversation {
  client: boolean;
  message: string;
  readed?: boolean;
  time: string;
}

export enum ChatType {
  SET_STATUS = "SET_STATUS",
  SET_CLIENT_ID = "SET_CLIENT_ID",
  SET_CONVERSATION = "SET_CONVERSATION",
  SET_READED = "SET_READED",
}

export interface ChatState {
  status: string;
  clientId: string;
  conversation: IConversation[];
}
