import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/main.scss';
import App from './App';
import axios from 'axios';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
if (localStorage.token) {
  axios.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${localStorage.getItem("token")}`;
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
       <PersistGate persistor={persistor}>
         <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
