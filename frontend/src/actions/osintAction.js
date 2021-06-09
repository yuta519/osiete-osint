import axios from 'axios'


export const FETCH_OSINTS = 'FETCH_OSINTS'
export const FETCH_OSINTS_REJECTED = 'FETCH_OSINTS_REJECTED'


export const fetch_osints = () => {
  const response = await axios.get('http://localhost:8000')
  dispatch({ type: FETCH_OSINTS, response })
}