import { Reducer } from "redux";
import { ChatType, ChatState } from "./types";
import { ChatReduxProcess } from "./chatLogic";

export const initialState: ChatState = {
  status: "",
  clientId: "",
  conversation: [],
};

const { SET_CLIENT_ID, SET_STATUS, SET_CONVERSATION, SET_READED } = ChatType;

const reducer: Reducer<ChatState> = (state = initialState, action) => {
  switch (action.type) {
    case SET_STATUS: {
      return ChatReduxProcess.setStatus(state, action);
    }
    case SET_CLIENT_ID: {
      return ChatReduxProcess.setClientId(state, action);
    }
    case SET_CONVERSATION: {
      return ChatReduxProcess.setConversation(state, action);
    }
    case SET_READED: {
      return ChatReduxProcess.setReaded(state, action);
    }
    default:
      return state;
  }
};

export { reducer as ChatReducer };
