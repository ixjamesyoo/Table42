import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();

  // test start
  window.getState = store.getState;
  window.dispatch = store.dispatch;
  // test end

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={ store }/>, root);
});
