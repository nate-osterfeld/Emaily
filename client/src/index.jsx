import 'materialize-css/dist/css/materialize.min.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import App from './components/App.jsx'
import reducers from './reducers/index.js'

const store = createStore(reducers, {}, applyMiddleware(reduxThunk))

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)
