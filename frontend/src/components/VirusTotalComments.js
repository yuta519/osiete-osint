import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const VirusTotalComments = (osint) => {

  const [vtcomments, setVtcomments] = useState([])

  useEffect(() => {
    const fetch_vtcomments = async() => {
      const response = await axios.post('http://localhost:8000/api/v1/vt/comments',{
        osint_id: osint['osint']
      })
      setVtcomments(response.data)
    } 
    fetch_vtcomments()
  },[vtcomments])

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
                { vtcomments.map((vtcomment, index) => (
                <tr key={index}>
                  <td>{ vtcomment.date }</td>
                  <td>{ vtcomment.comment }</td>
                </tr>
                ))}
              </tbody>
            </table> 
        </div>
      </div>)
    :(<></>)}
    </>  
  )
}
