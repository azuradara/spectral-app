import React from 'react';
import { render } from 'react-dom';
import './stylesheets/main.scss';
import Root from './App';
import axios from 'axios';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from '#store/index';

// TODO: move this when revamping auth module

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
require('#config/axios.ts');
// if (localStorage.token) {
//   axios.defaults.headers.common[
//     'Authorization'
//   ] = `Bearer ${localStorage.getItem('token')}`;
// }

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
