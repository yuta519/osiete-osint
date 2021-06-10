import React, { useEffect, useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import fetch_osints from '../actions/osintAction'
import axios from 'axios'

function HotOsints() {
  const [osints, setOsints] = useState([])
  useEffect(async () => {
    const response = await axios.get('http://localhost:8000/api/data')
    setOsints(response.data)
  }, [])
  console.log(osints)

  return (
    <div className='container'>

      <h4>Hot OSINT</h4>
      <table className="table table-hover table-striped">
        <thead>
          <th>No.</th>
          <th>OSINT</th>
          <th>Type</th>
          <th>Risk</th>
          <th>Last Updated</th>
        </thead>
        <tbody>
          { osints.map((osint, index) => (
            <tr id={index}>
              <td>{ index+1 }</td>
              <td>{ osint.data_id }</td>
              <td>{ osint.analyzing_type }</td>
              <td>{ osint.malicious_level }</td>
              <td>{ osint.last_analyzed }</td>
            </tr>
          )) }
        </tbody>

      </table>
        
    </div>
  );
}

export default HotOsints;
