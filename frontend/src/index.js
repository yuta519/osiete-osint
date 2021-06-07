import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import HotOsints from './components/HotOsints'
import Header from './Header'

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <App />
    {/* <HotOsints /> */}
  </React.StrictMode>,
  document.getElementById('root')
);
