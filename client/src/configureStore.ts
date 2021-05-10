import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { ApplicationState, createRootReducer } from "store";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
  }
}

function configureStore(initialState: ApplicationState) {
  const composeEnhancer: typeof compose =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    createRootReducer(),
    initialState,
    composeEnhancer(applyMiddleware(thunk))
  );
  return store;
}
const initialState: any = {};
const store = configureStore(initialState);

export default store;
