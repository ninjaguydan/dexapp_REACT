import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import store from "./Redux/store"
// CSS
import "bootstrap/dist/css/bootstrap.min.css"
import "./css/Reset.css"
import "./css/Style.css"
import "./css/Login-Registration.css"
import "./css/Search.css"
import "./css/Profile.css"
// Comps
import App from "./App"

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("dexapp")
)
