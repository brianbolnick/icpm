import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from './tools/store';


ReactDOM.render((
  <Provider store={store}>
      <ConnectedRouter history={history}>
          <div id='app'>
              <App />
          </div>
      </ConnectedRouter>
  </Provider>
), document.getElementById('root'))
registerServiceWorker();

