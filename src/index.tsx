import React from 'react';
import ReactDOM from 'react-dom/client';
import { Normalize } from 'styled-normalize';
import { Provider } from 'react-redux';
import App from './App';
import { FontStyles, GlobalStyle } from './components/GlobalStyle';
import { store } from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Normalize />
      <FontStyles />
      <GlobalStyle />
    </Provider>
  </React.StrictMode>
);
