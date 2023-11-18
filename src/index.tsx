import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

// Comps
import App from 'App'
// CSS
import 'css/global.css'
import store from 'redux/store'

ReactDOM.render(
	// <React.StrictMode>
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('dexapp'),
)
