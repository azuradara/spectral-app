import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/main.scss';
import App from './App';
import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';
if (localStorage.token) {
  axios.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${localStorage.token}`;
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
