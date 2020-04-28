import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {HashRouter} from 'react-router-dom'

const app = (<HashRouter><App/></HashRouter>);

ReactDOM.render(
  app,
  document.getElementById('root')
);

serviceWorker.unregister();
