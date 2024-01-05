import axios from 'axios'

import environment from '@/config/environment'

export const BASE_VIDEO_API_URL = environment.BASE_API_URL + '/videos'

export const videoEndpoint = axios.create({
  baseURL: BASE_VIDEO_API_URL
})

export * from './endpoints'
