import axios from 'axios'

export const FETCH_OSINTS = 'FETCH_OSINTS'
export const FETCH_OSINTS_REJECTED = 'FETCH_OSINTS_REJECTED'
export const SEARCH_OSINT = 'SEARCH_OSINT'


export const fetch_osints = () => {
  const response = await axios.get('http://localhost:8000/api/data')
  dispatch({ type: FETCH_OSINTS, response })
}

export const search_osint = () => {
  const response = await axios.get('http://localhost:8000/api/data')
  dispatch({ type: SEARCH_OSINT, response })
}