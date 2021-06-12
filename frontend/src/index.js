import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import About from './components/About'
import App from './components/App'
import Header from './components/Header'
import Footer from './components/Footer'
import SearchOsint from './components/SearchOsint'

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <Router>
        <Route path="/" exact><App /></Route>
        <Route path="/what_is_osiete_osint" exact><About /></Route>
        <Route path="/search_osint" exact><SearchOsint /></Route>
    </Router>
    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);
