import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'

// import App from './components/App'
import HotOsints from './components/HotOsints'
import Header from './components/Header'
// const store = createStore(reducer)

ReactDOM.render(
  <React.StrictMode>
    <Header />
    {/* <App /> */}
    {/* <SearchOsint /> */}
    <HotOsints />
  </React.StrictMode>,
  document.getElementById('root')
);
