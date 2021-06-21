import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { UrlscanDetail } from './UrlscanDetail'

function OsintDetail() {
  const [type, setType] = useState([])
  const [osint_info, setOsintInfo] = useState([])

  const current_url = window.location.href
  const result = current_url.match(/http:\/\/.*osint\/(.*)\/(.*)/) 
  const osint = result[2]
  
  useEffect(() => {
    if (result[1] === '1') {
      setType('IP Address')
    } else if (result[1] === 2) {
      setType('Domain')
    } else if (result[1] === 3) {
      setType('File Hash')
    } else {
      setType('Unknown')
    } 
  }, [result])

  useEffect(() => {
    const search_osint = async() => {
      const response = await axios.post('http://localhost:8000/api/v1/osint', {
        data_id: osint,
      })
      console.log(response.data)
      setOsintInfo(response.data)
    }
    search_osint()
  }, [osint])

  // if (result[1] === 2) {
  //   useEffect(() => {
  //     const fetch_uscan = async() => {
  //       const response = await axios.post('http://localhost:8000/api/v1/urlcan_osint', {
  //         osint_id: osint 
  //       })
  //       console.log(response)
  //       setUscanInfo(response)
  //     }
  //     fetch_uscan()
  //   }, [])
  // }

  return (
    <div className='container' style={{ "margin": "50px" }}>
      <div className="card " style={{ "margin": "10px" }}>
        <div className="card-header">
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              {/* <a className="nav-link active" href="">Summary Report</a> */}
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item">
              <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
            </li> */}
          </ul>
        </div>
        <div className="card-body">
          <h3 className="card-title">{ osint }</h3>
          <p className="card-text"> natural lead-in to additional content.</p>
          <table className="table">
            <tbody>
              <tr>
                <td><b>TYPE</b></td>
                <td>{ type }</td>
              </tr>
              <tr>
                <td><b>RISK</b></td>
                <td>{ 
                      osint_info['malicious_level'] 
                 }</td>
              </tr>
              <tr>
                <td><b>OWNER</b></td>
                <td>{ osint_info['owner'] }</td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
      <div className="card-group" style={{ "margin": "10px" }}>
        <div className="card">
          <svg class="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Image cap"><title>Placeholder</title><rect fill="#868e96" width="100%" height="100%"/><text fill="#dee2e6" dy=".3em" x="50%" y="50%">Image cap</text></svg>
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
            <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>ID No.</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Samso Park</td>
                <td>34424433</td>
              </tr>
              <tr>
                <td>Marlo Sanki</td>
                <td>53425532</td>
              </tr>
              <tr>
                <td>John ryte</td>
                <td>53275533</td>
              </tr>
              <tr>
                <td>Peter mark</td>
                <td>53275534</td>
              </tr>
              <tr>
                <td>Dave</td>
                <td>53275535</td>
              </tr>
            </tbody>
          </table> 
            </p>
          </div>
          <div className="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
        <UrlscanDetail osint={osint}/>
        <UrlscanDetail osint={osint}/>
      </div>

    </div>
  )
}

export default OsintDetail