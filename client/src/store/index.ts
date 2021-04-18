import { combineReducers } from "redux";
import { ChatReducer, ChatState } from "./chat";
export interface ApplicationState {
  chat: ChatState;
}

export const createRootReducer = () =>
  combineReducers({
    chat: ChatReducer,
  });
