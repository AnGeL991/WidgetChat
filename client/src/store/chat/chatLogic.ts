import { AnyAction } from "redux";
import { ChatState } from "./types";

export class ChatReduxProcess {
  static setStatus(state: ChatState, action: AnyAction) {
    return { ...state };
  }
  static setClientId(state: ChatState, action: AnyAction) {
    return { ...state };
  }
  static setConversation(state: ChatState, action: AnyAction) {
    return {
      ...state,
      conversation: [...state.conversation, ...action.payload],
    };
  }
  static setReaded(state: ChatState, action: AnyAction) {
    const conversation = state.conversation.map((el) => ({
      ...el,
      readed: true,
    }));
    return {
      ...state,
      conversation: [...conversation],
    };
  }
  static requestLoading(state: ChatState, action: AnyAction) {
    return { ...state, loading: true };
  }
  static successLoading(state: ChatState, action: AnyAction) {
    return { ...state, conversation: [...action.payload] };
  }
  static failureLoading(state: ChatState, action: AnyAction) {
    return { ...state, error: action.payload };
  }
}
