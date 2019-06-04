import React from 'react';
import { render } from 'react-dom';
import App from './containers/App/';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from '../src/reducers';

const store = createStore(rootReducer);

render(
  <Provider store={ store } >
    <App />
  </Provider>,
  document.getElementById('root')
);
