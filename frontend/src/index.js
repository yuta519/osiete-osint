import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import HotOsints from './components/HotOsints'; 
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <HotOsints />
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
