import axios from 'axios'
import type { AxiosResponse } from 'axios'
import type { Event } from '@/types'

const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/Code-Pop/Real-World_Vue-3',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  withCredentials: false
})

export default {
  getEvents(): Promise<AxiosResponse<Event[]>> {
    return apiClient.get('/events')
  },
  getEvent(id: number): Promise<AxiosResponse<Event>> {
    return apiClient.get(`/events/${id}`)
  }
}