import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://ec2-3-38-95-2.ap-northeast-2.compute.amazonaws.com',
})

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

export default instance