import React from "react";
// import { connect } from "react-redux";

// import { fetchDangerousOsints } from "../actions/osintActions";

function HotOsints() {
  return (
    <div>
      <h1>Hot OSINT</h1>
      <table className="table table-striped">
        <thead>
        <tr>
            <th>OSINT</th> 
            <th>Last Update Time</th>
            <th>Osint Type</th>
            <th>Risk</th>
        </tr>
        </thead>
        <tbody>
        {/* {mappedOsints} */}
        </tbody>
      </table>
    </div>
  );
}

export default HotOsints;