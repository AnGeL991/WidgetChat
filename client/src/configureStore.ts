import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { ApplicationState, createRootReducer } from "store";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
  }
}

export function configureStore(initialState: ApplicationState) {
  const store = createStore(
    createRootReducer(),
    initialState,
    applyMiddleware(thunk)
  );
  return store;
}
