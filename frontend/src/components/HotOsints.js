import React, { useEffect, useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import fetch_osints from '../actions/osintAction'
import axios from 'axios'

function HotOsints() {
  useEffect(async () => {
    const response = await axios.get('http://localhost:8000/api/data')
    console.log(response.data)
  })
  const [osints] = useState('')
  return (
    <div className='container-fluid'>

      <h4>Hot OSINT</h4>
      <table className="table table-hover">
        <thead>
          <th>No.</th>
          <th>OSINT</th>
          <th>Type</th>
          <th>Risk</th>
          <th>Last Updated</th>
        </thead>
        <tbody>

        </tbody>

      </table>
      
    </div>
  );
}

export default HotOsints;
