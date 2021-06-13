import React, { useReducer, useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'

import reducer from '../reducers'


function SearchOsint() {

  const [state, dispatch] = useReducer(reducer)
  const [osint, setOsint] = useState('')
  const [type, setType] = useState('')
  
  const searchOsint = e => {
    e.preventDefault() 
    dispatch({ type: 'SEARCH_OSINT', osint, type }) 
    console.log(osint, type, state)
  }

  return (
    <div className='container'>

      <h4>Search OSINT</h4>
      <form>
        <div className="form-group">
          <label htmlFor="formEventOsint">OSINT</label>
          <input className="form-control" id="formEventOsint" value={ osint } onChange={e => setOsint(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="formEventType">Type</label>
          <select className="form-control" id="formEventType" onChange={e => setType(e.currentTarget.value)}>
            <option value="">---</option>
            <option value="1">IP Address</option>
            <option value="2">URL</option>
            <option value="3">File Hash</option>
          </select>
        </div>
        <button className="btn btn-primary" onClick={ searchOsint }>search</button>
      </form>

      {/* <h4>OSINT Result</h4>
      <table className="table table-hover table-striped">
        <thead>
          <th>No</th>
          <th>OSINT</th>
          <th>Type</th>
          <th>Risk</th>
          <th>Last Updated</th>
        </thead>
        <tbody>

        </tbody>

      </table> */}
      
    </div>
  )
}

export default SearchOsint;
