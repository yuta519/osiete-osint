import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'


function Header() {
  return (
    <>
      <nav className="navbar navbar-dark bg-dark fixed-top flex-md-nowrap p-0 shadow">
        <div className="container-fuid">
        <a className="navbar-brand" href="/"> 
          OSIETE OSINT
        </a>
        </div>
      </nav>
      <ul className="nav justify-content-end" style={{'marginTop': '30px'}}>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">Hot OSINTs</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/search_osint">Search OSINT</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/what_is_osiete_osint">About</a>
        </li>
      </ul>
    </>
  )
}

export default Header;
