import React from 'react';
import ReactDOM from 'react-dom';
import { createStore} from 'redux';
import { Provider } from 'react-redux';

import App from './components/App';
import HotOsints from './components/HotOsints'; 
import reportWebVitals from './reportWebVitals';
import reducer from './reducers';

const store = createStore(reducer)

ReactDOM.render(
  <Provider store={store}>
    <HotOsints />
  </Provider>,
  document.getElementById('root')
);
reportWebVitals();
