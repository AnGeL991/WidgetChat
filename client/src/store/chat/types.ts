export interface IConversation {
  client: boolean;
  message: string;
  readed?: boolean;
  time: string;
}

export enum ChatType {
  LOAD_REQUEST = "LOAD_REQUEST",
  END_REQUEST = "END_REQUEST",
  FAILURE_REQUEST = "FAILURE_REQUEST",
  SET_STATUS = "SET_STATUS",
  SET_CLIENT_ID = "SET_CLIENT_ID",
  SET_CONVERSATION = "SET_CONVERSATION",
  SET_READED = "SET_READED",
}

export interface ChatState {
  status: string;
  clientId: string;
  conversation: IConversation[];
  loading: boolean;
  error: string;
}
