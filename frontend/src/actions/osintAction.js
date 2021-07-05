import axios from 'axios'

export const FETCH_OSINTS = 'FETCH_OSINTS'
export const FETCH_OSINTS_REJECTED = 'FETCH_OSINTS_REJECTED'
export const SEARCH_OSINT = 'SEARCH_OSINT'


export const fetch_osints = () => async dispatch => { 
  const response = await axios.get('http://localhost:8000/api/data')
  dispatch({ type: FETCH_OSINTS, response })
}

export const search_osint = id => async dispatch => { 
  const response = await axios.post('http://localhost:8000/api/data', {
    data_id: id
  })
  dispatch({ type: SEARCH_OSINT, response })
}