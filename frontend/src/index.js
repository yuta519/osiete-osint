import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import About from './components/About'
import App from './components/App'
import OsintDetail from './components/OsintDetail'
import SearchOsint from './components/SearchOsint'
import Header from './components/Header'
import Footer from './components/Footer'

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <Router>
        <Route path="/" exact><App /></Route>
        <Route path="/osint"><OsintDetail /></Route>
        <Route path="/search_osint" exact><SearchOsint /></Route>
        <Route path="/what_is_osiete_osint" exact><About /></Route>
    </Router>
    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
);
