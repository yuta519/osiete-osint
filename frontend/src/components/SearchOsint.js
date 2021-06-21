import React, { useReducer, useState } from 'react'

import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

import reducer from '../reducers'


function SearchOsint() {

  // const [state, dispatch] = useReducer(reducer, [])
  const [state] = useReducer(reducer, [])
  const [osint, setOsint] = useState('')
  const [type, setType] = useState('')
  const [res, setRes] = useState('')
  
  const searchOsint = e => {
    e.preventDefault()
    console.log({osint, type, state})
    // dispatch({type: 'SEARCH_OSINT', osint, type})
    const search_osint = async() => {
      const response = await axios.post('http://localhost:8000/api/v1/osint', {
        data_id: osint,
      })
      setRes(response.data) 
    }
    search_osint()
    console.log(res)
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
        <button className="btn btn-primary" style={{ "margin-top": "20px" }} onClick={ searchOsint }>search</button>
      </form>
      { res ? (
        <div style={{ "margin-top": "50px" }}>
          <h4>OSINT Result</h4>
          <table className="table table-hover table-striped">
            <thead>
              <tr>
                <th>OSINT</th>
                <th>VirusTotal URL</th>
                <th>Risk</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>{res.data_id}</th>
                <th><a href={res.gui}>{res.gui}</a></th>
                <th>{res.malicious_level === 1? 'Dangerous' 
                    :res.malicious_level === 2? 'Suspicious'
                    :res.malicious_level === 3? 'Safe'
                    : 'Unknown' }</th>
                <th>{res.owner}</th>
              </tr>
            </tbody>
          </table>
        </div>)
      :(<div></div>)}
    </div>
  )
}

export default SearchOsint;