import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "redux/store";
// CSS
import "css/global.css";
// Comps
import App from "App";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("dexapp")
);
