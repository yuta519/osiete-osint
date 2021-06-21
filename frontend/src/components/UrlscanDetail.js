import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const UrlscanDetail = (osint) => {
  const [usosint, setUsosint] = useState([])
  useEffect(()=>{
    console.log(osint)
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
    <div className="card">
      <svg class="bd-placeholder-img card-img-top" width="100%" height="180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Image cap"><title>Placeholder</title><rect fill="#868e96" width="100%" height="100%"/><text fill="#dee2e6" dy=".3em" x="50%" y="50%">Image cap</text></svg>
      <div class="card-body">
        <h5 class="card-title">Urlscan.io information</h5>
        <p class="card-text">To additional content. This content is a little bit longer.
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>ID No.</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>date</td>
                <td>{ usosint.date }</td>
              </tr>
              <tr>
                <td>primary ip</td>
                <td>{ usosint.primary_ip }</td>
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
    </div>
  )
}
