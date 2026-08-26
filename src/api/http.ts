import axios from 'axios'
import { getCookie } from '../utils/cookie'

export const http = axios.create({
  baseURL: '/api',
  timeout: 8000,
})

http.interceptors.request.use((config) => {
  const token = getCookie('accessToken')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
