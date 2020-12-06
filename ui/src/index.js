import React from 'react'
import ReactDOM from 'react-dom'
import './index.css';
import App from './App'
import {Provider} from 'react-redux'
import store from './redux/store'

export const uploadFile = process.env.REACT_APP_UPLOAD_FILE_URL;

const rootElement = document.getElementById('root');
console.log(store);
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  rootElement
);

