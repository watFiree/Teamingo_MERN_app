import React from 'react';
import ReactDOM from 'react-dom';
import Root from './views/Root';
import * as serviceWorker from './serviceWorker';
import styles from './styles/GlobalStyle.module.scss'

ReactDOM.render(
  <React.StrictMode>
    <Root className={styles} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
