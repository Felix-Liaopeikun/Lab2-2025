import axios from 'axios'
import type { AxiosResponse } from 'axios'
import type { Student } from '@/types'
import NProgress from 'nprogress'

const apiClient = axios.create({
  baseURL: 'https://dv-student-backend-2019.appspot.com',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  withCredentials: false
})

apiClient.interceptors.request.use(config => {
  NProgress.start()
  return config
})

apiClient.interceptors.response.use(
  response => {
    NProgress.done()
    return response
  },
  error => {
    NProgress.done()
    return Promise.reject(error)
  }
)

export default {
  getStudents(): Promise<AxiosResponse<Student[]>> {
    return apiClient.get('/students')
  }
}