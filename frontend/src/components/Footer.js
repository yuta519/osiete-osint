import React from 'react'

function Footer() {
  return (
      <footer className="footer mx-auto py-3 bg-light" style={{ "position": "absolute", "bottom": "0", "width": "100%" }}>
        <div className="container">
          <span className="text-muted">
            Copyright <a href="/">OSIETE OSINT</a>, by <a href="https://github.com/yuta519/osiete-osint.git">@yuta519</a>.
          </span>
        </div>
      </footer>
  )
}

export default Footer