import { Reducer } from "redux";
import { ChatType, ChatState } from "./types";
import { ChatReduxProcess } from "./chatLogic";

export const initialState: ChatState = {
  status: "",
  clientId: "",
  conversation: [],
  loading: false,
  error: "",
};

const {
  SET_CLIENT_ID,
  SET_STATUS,
  SET_CONVERSATION,
  SET_READED,
  LOAD_REQUEST,
  END_REQUEST,
  FAILURE_REQUEST,
} = ChatType;

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
    case LOAD_REQUEST: {
      return ChatReduxProcess.requestLoading(state, action);
    }
    case END_REQUEST: {
      return ChatReduxProcess.successLoading(state, action);
    }
    case FAILURE_REQUEST: {
      return ChatReduxProcess.failureLoading(state, action);
    }
    default:
      return state;
  }
};

export { reducer as ChatReducer };
