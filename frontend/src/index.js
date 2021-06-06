import React from 'react';
import ReactDOM from 'react-dom';
import { createStore} from 'redux';
import { Provider } from 'react-redux';

import App from './components/App';
import HotOsints from './components/HotOsints'; 
import Nav from './components/layout/Nav';
import reportWebVitals from './reportWebVitals';
import reducer from './reducers';

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Nav />
    </React.StrictMode>
    <App />
    <HotOsints />
  </Provider>,
  document.getElementById('root')
);
reportWebVitals();
