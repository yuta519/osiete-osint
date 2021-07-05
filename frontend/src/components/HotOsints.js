import React, { useEffect, useState } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

function HotOsints() {
  const [osints, setOsints] = useState([])
  
  useEffect(() => {
    const fetch_osints = async () => {
      const response = await axios.get('http://localhost:8000/api/v1/osints')
      // const response = await axios.get('http://18.188.220.79:8000/api/v1/osints')
      setOsints(response.data)
    }
    fetch_osints()
  }, [])

  return (
    <div className='container'>
      <h4>Hot OSINT</h4>
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>OSINT</th>
            <th>Type</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          { osints.map((osint, index) => (
            <tr key={index}>
              <td><a href={"osint/"+osint.osint_type+"/"+osint.osint_id}>{osint.osint_id}</a></td>
              { osint.osint_type === 1? (<td>IP Address</td>) 
              : osint.osint_type === 2? (<td>Domain</td>) 
              : osint.osint_type === 3? (<td>File Hash</td>) 
              : (<td></td>) }
              {/* { osint.malicious_level === 1? (<td>MALICIOUS</td>)
              : osint.malicious_level === 2? (<td>SUSPICIOUS</td>) 
              : osint.malicious_level === 3? (<td>SAFE</td>) 
              : (<td></td>) } */}
              <td>{osint.updated_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default HotOsints;
