import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const VirusTotalComments = (osint) => {

  const [vtcomments, setVtcomments] = useState([])

  useEffect(() => {
    const fetch_vtcomments = async() => {
      const response = await axios.post('http://localhost:8000/api/v1/vt/comments',{
        osint_id: osint['osint']
      })
      setVtcomments(response.data[0])
      console.log(response.data)
    } 
    fetch_vtcomments()
  },[])

  return (
    <>
    { vtcomments ? (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">VT Comments information</h5>
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
                  <td>Posted Date</td>
                  <td>{ vtcomments.date }</td>
                </tr>
                {/* <tr>
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
                </tr> */}
              </tbody>
            </table> 
        </div>
      </div>)
    :(<></>)}
    </>  
  )
}
