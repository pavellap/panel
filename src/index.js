import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './normalize.css'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import {applyMiddleware, createStore} from "redux";
import reducer from './Redux/Reducers/RootReducer'
import thunk from "redux-thunk";
import url from "./config";
import Axios from "axios";

const store = createStore(reducer, applyMiddleware(thunk) )



const app =
    (<Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
