import axios from 'axios'
import React, { useEffect, useState } from 'react'


export const VirusTotalDetail = (osint) => {

  const [vtosint, setVtosint] = useState([])
  
  useEffect(() => {
    const fetch_vtsummary = async() => {
      const response = await axios.post("http://localhost:8000/api/v1/vtsummary",{
        data_id: osint['osint']
      })
      setVtosint(response.data)
    }
    fetch_vtsummary()
  }, [osint])
  
  return (
    <>
      { vtosint ? (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">VirusTotal Summary information</h5>
            {/* <p className="card-text">To additional content. This content is a little bit longer.</p> */}
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>---</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>OSINT</td>
                    <td>{ vtosint.data_id }</td>
                  </tr>
                  <tr>
                    <td>Owner</td>
                    <td>{ vtosint.owner }</td>
                  </tr>
                  <tr>
                    <td>Malicious Level</td>
                    <td>
                      { vtosint.malicious_level === 1? ("Malicious")
                       :vtosint.malicious_level === 2? ("Suspicious")
                       :vtosint.malicious_level === 3? ("Safe") 
                       : (<></>)}
                    </td>
                  </tr>
                </tbody>
              </table> 
              <a href={vtosint.gui}>
                <button type="button" className="btn btn-primary">Go to VirusTotal</button>
              </a>
          </div>
        </div>)
      :(<></>)}
    </>  
  )
}
