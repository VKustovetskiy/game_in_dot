import axios from 'axios'

const isSecure = process.env.VUE_APP_SECURE === 'true'
const domain = process.env.VUE_APP_DOMAIN

const api = axios.create({
  baseURL: `http${isSecure ? 's' : ''}://${domain}/`,
  timeout: 50 * 1000,
  headers: {
    'Content-Type': 'application/json'
  },
  validateStatus: status => status <= 503
})

api.interceptors.response.use(
  response => {
    if (response.status !== 200 && response.status !== 201) {
      alert(response.data.error)
    }

    return response
  }
)

export default api
