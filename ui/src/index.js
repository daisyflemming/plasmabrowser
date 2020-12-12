import React from 'react'
import ReactDOM from 'react-dom'
import './index.css';
import App from './App'
import {Provider} from 'react-redux'
import {createStore} from 'redux';
import {appReducer} from "./redux/reducers";

export const uploadFile = process.env.REACT_APP_UPLOAD_FILE_URL;

const rootElement = document.getElementById('root');

const store = createStore(
  appReducer,
  {
    rootReducer: {
      expressionCounts: [], expressionAnnotations:[], loading: false
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  rootElement
);

