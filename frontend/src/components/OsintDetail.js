import React from 'react'
import { useLocation } from 'react-router-dom'

function OsintDetail() {
  const location = useLocation();
  // const typepath_pattern = '/^osint//(d)//(.*)/g'
  const result = location['pathname'].match(/osint\/(d)\//) 
  // const osintpath_pattern = ''
  console.log(location)
  console.log(result)
  return (
    <>
      <h4>OSINT</h4>
    </>
  )
}

export default OsintDetail