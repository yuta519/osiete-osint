import React, { useEffect, useState } from 'react'

function OsintDetail() {
  const [type, setType] = useState([])
  const [osint, setOsint] = useState([])

  const current_url = window.location.href
  const result = current_url.match(/http:\/\/.*osint\/(.*)\/(.*)/) 

  console.log(result[1])

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
    <>
      <h4>OSINT</h4>
      <div>{ type }</div>
      <div>{ osint }</div>
    </>
  )
}

export default OsintDetail