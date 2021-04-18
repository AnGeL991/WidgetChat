import { Reducer } from "redux";
import { ChatType, ChatState } from "./types";

export const initialState: ChatState = {
  status: "",
  clientId: "",
  conversation: [],
};

const { SET_CLIENT_ID, SET_STATUS, SET_CONVERSATION } = ChatType;

const reducer: Reducer<ChatState> = (state = initialState, action) => {
  switch (action.type) {
    case SET_STATUS: {
      return { ...state };
    }
    case SET_CLIENT_ID: {
      return { ...state };
    }
    case SET_CONVERSATION: {
      return {
        ...state,
        conversation: [...state.conversation, ...action.payload],
      };
    }
    default:
      return state;
  }
};

export { reducer as ChatReducer };
