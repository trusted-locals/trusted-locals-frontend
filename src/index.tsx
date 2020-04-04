import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { App } from './app/App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { unregister } from './serviceWorker';

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);

// Preliminary
unregister();
