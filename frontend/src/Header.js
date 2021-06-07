import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'

function Header() {
  return (
    <div className='container-fluid'>

      <h4>Search OSINT</h4>
      <form>
        <div className="form-group">
          <label htmlFor="formEventOsint">OSINT</label>
          <input className="form-control" id="formEventOsint" />
        </div>
        <div className="form-group">
          <label htmlFor="formEventBody">Body</label>
          <textarea className="form-control" id="formEventBody" />
        </div>
        <button className="btn btn-primary">search</button>
      </form>

      <h4>OSINT List</h4>
      <table className="table table-hover">
        <thead>
          <th>No</th>
          <th>OSINT</th>
          <th>Type</th>
          <th>Risk</th>
          <th>Last Updated</th>
        </thead>
        <tbody>

        </tbody>

      </table>
      
    </div>
  )
}

export default Header;
