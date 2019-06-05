import App from './containers/App/';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../src/reducers';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

render(
  <BrowserRouter>
    <Provider store={ store } >
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
