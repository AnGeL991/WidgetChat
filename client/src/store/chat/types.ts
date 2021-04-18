export interface IConversation {
  client: boolean;
  message: string;
  time: number;
}

export enum ChatType {
  SET_STATUS = "SET_STATUS",
  SET_CLIENT_ID = "SET_CLIENT_ID",
  SET_CONVERSATION = "SET_CONVERSATION",
}

export interface ChatState {
  status: string;
  clientId: string;
  conversation: IConversation[];
}
