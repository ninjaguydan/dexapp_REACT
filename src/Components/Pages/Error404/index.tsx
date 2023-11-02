import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "../../../redux/store";
// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/Reset.css";
import "./css/Style.css";
import "./css/Login-Registration.css";
import "./css/Search.css";
import "./css/Profile.css";
import "./css/Team.css";
// Comps
import Error from "./PageNotFound";

ReactDOM.render(
  <Provider store={store}>
    <Error />
  </Provider>,
  document.getElementById("error")
);
