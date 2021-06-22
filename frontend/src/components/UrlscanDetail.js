import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const UrlscanDetail = (osint) => {

  const [usosint, setUsosint] = useState([])
  useEffect(() => {
    const fetch_uscan = async() => {
      const response = await axios.post('http://localhost:8000/api/v1/urlscan_osint',{
        domain: osint['osint']
      })
      setUsosint(response.data[0])
      console.log(response)
    } 
    fetch_uscan()
  },[])

  return (
    <>
    { usosint ? (
      <div className="card">
        <div class="card-body">
          <h5 class="card-title">Urlscan.io information</h5>
          <p class="card-text">To additional content. This content is a little bit longer.
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>---</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Updated Date</td>
                  <td>{ usosint.date }</td>
                </tr>
                <tr>
                  <td>Domain</td>
                  <td>{ usosint.domain }</td>
                </tr>
                <tr>
                  <td>Primary IP</td>
                  <td>{ usosint.primary_ip }</td>
                </tr>
                <tr>
                  <td>PTR record</td>
                  <td>{ usosint.ptr }</td>
                </tr>
                <tr>
                  <td>Server</td>
                  <td>{ usosint.server }</td>
                </tr>
                <tr>
                  <td>ASN</td>
                  <td>{ usosint.asn }</td>
                </tr>
                <tr>
                  <td>Asnname</td>
                  <td>{ usosint.asnname }</td>
                </tr>
              </tbody>
            </table> 
            <img src={usosint.screenshot} className="center-block" style={{ 
              "display": "block", "height": "auto", "max-width": "100%" }}/>
          </p>
        </div>
      </div>)
    :(<></>)}
    </>  
  )
}
