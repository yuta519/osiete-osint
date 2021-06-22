import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { UrlscanDetail } from './UrlscanDetail'

function OsintDetail() {
  const [type, setType] = useState([])
  const [risk, setRisk] = useState("")
  const [osint_info, setOsintInfo] = useState([])

  const current_url = window.location.href
  const result = current_url.match(/http:\/\/.*osint\/(.*)\/(.*)/) 
  const osint = result[2]
  
  useEffect(() => {
    if (result[1] === '1') {
      setType('IP Address')
    } else if (result[1] === '2') {
      setType('Domain')
    } else if (result[1] === '3') {
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
      setOsintInfo(response.data)
      if (response.data["malicious_level"] === 1) {
        setRisk("Malicious")
      } else if (response.data["malicious_level"] === 2) {
        setRisk("Suspicious")
      } else if (response.data["malicious_level"] === 3) {
        setRisk("Safe")
      } else {
        setRisk("Unknown")
      }
    }
    search_osint(osint_info['malicious_level'])
  }, [osint])

  return (
    <div className='container'>
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
          <h2 className="card-title">{ osint }</h2>
          {/* <p className="card-text"> natural lead-in to additional content.</p> */}
          <table className="table">
            <tbody>
              <tr>
                <td><b>TYPE</b></td>
                <td>{ type }</td>
              </tr>
              <tr>
                <td><b>RISK</b></td>
                <td>{ risk }</td>
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
        <UrlscanDetail osint={osint}/>
        <UrlscanDetail osint={osint}/>
        <UrlscanDetail osint={osint}/>
      </div>

    </div>
  )
}

export default OsintDetail