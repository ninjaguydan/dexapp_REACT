import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "redux/store";
// CSS
// import "bootstrap/dist/css/bootstrap.min.css";
import "css/global.css";
// Comps
import App from "App";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("dexapp")
);
