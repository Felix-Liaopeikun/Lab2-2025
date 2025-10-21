import axios from 'axios'
import type { AxiosResponse } from 'axios'
import type { Event } from '@/types'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
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