import { FETCH_OSINT } from '../actions/OsintAction'

const initialState = { osints: [] }

export default (state=initialState, action) => {
  switch(action.type) {
    case FETCH_OSINT:
      return { osints: state.osints }
    default:
      return { osints: ['error'] }
  }
  
}