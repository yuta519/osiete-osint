import React, { useEffect, useReducer, useState } from 'react'

import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import fetch_osints from '../actions/osintAction'
import reducer from '../reducers'

function HotOsints() {
  const [osints, setOsints] = useState([])
  const [new_osints, dispatch] = useReducer(reducer, [])
  useEffect(async () => {
    dispatch('FETCH_OSINTS')
    const response = await axios.get('http://localhost:8000/api/data')
    setOsints(response.data)
  }, [])
  console.log(osints)
  console.log(new_osints, 'amazing')

  return (
    <div className='container'>
      <h4>Hot OSINT</h4>
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            {/* <th>No.</th> */}
            <th>OSINT</th>
            <th>Type</th>
            <th>Risk</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          { osints.map((osint, index) => (
            <tr key={index}>
              {/* <td>{ index+1 }</td> */}
              <td><a href={"osint/"+osint.data_id}>{osint.data_id}</a></td>
              { osint.analyzing_type === 1? (<td>IP Address</td>) 
              : osint.analyzing_type === 2? (<td>URL</td>) 
              : osint.analyzing_type === 3? (<td>File Hash</td>) 
              : (<td></td>) }
              { osint.malicious_level === 1? (<td>MALICIOUS</td>)
              : osint.malicious_level === 2? (<td>SUSPICIOUS</td>) 
              : osint.malicious_level === 3? (<td>SAFE</td>) 
              : (<td></td>) }
              <td>{osint.last_analyzed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HotOsints;
