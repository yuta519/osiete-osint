import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import App from './components/App'
import Header from './components/Header'


ReactDOM.render(
  <React.StrictMode>
    <Header />
    <Router>
        <Route path="/" exact><App /></Route>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
