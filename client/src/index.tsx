import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { configureSocket } from "_socket";
import { configureStore } from "configureStore";
import { Provider } from "react-redux";
import { initData } from "store/fetch";
import "normalize.css";

export const socket = configureSocket();

function onLoad(store: any) {
  store.dispatch(initData());
}

function initApp() {
  const initialState: any = {};
  const store = configureStore(initialState);
  onLoad(store);

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
}

initApp();
