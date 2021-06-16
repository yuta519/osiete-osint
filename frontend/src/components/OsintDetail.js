import React, { useEffect, useState } from 'react'

function OsintDetail() {
  const [type, setType] = useState([])
  const [osint, setOsint] = useState([])

  const current_url = window.location.href
  const result = current_url.match(/http:\/\/.*osint\/(.*)\/(.*)/) 

  console.log(result)

  useEffect(()=>{
    if (result[1] === '1') {
      setType('IP Address')
    } else if (result[1] === 2) {
      setType('Domain')
    } else if (result[1] === 3) {
      setType('File Hash')
    } else {
      setType('Unknown')
    } 
    setOsint(result[2])
  }, [])

  return (
    <div className='container'>
      <h4>OSINT</h4>
      <div>{ type }</div>
      <div>{ osint }</div>
    </div>
  )
}

export default OsintDetail