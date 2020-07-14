import React from 'react';
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./modules/store";
import App from './components/app';
import { Router } from 'react-router-dom';
import history from "./modules/history";

ReactDOM.render(
    <Provider store={store}>
      <Router history = {history}>
        <App/>
      </Router>
    </Provider>
    ,
    document.getElementById("fanbase")
  );