import Axios from 'axios'

let api = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
}) /*
api.interceptors.response.use(
  response => response,
  error => {
    let errorCode = ''
    if (error && error.response && error.response.status)
      errorCode = error.response.status
    navigate('/dashboard/home/error', {
      state: { code: errorCode }
    })
    throw error
  }
)*/
export default api
