import React from "react";
import { connect } from "react-redux";

import {fetch_osint} from '../actions/OsintAction';
// import { fetchDangerousOsints } from "../actions/osintActions";

function HotOsints() {
  return (
    <div>
      osints : aaaa
    </div>
  );
}


export default connect(
  state => ({ osints: state.osints }),
  dispatch => ({ dispatchAddValue: amount => dispatch(addValue(amount)) })
)(Counter)
export default HotOsints;