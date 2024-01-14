import axios from 'axios'

import environment from '@/config/environment'

import { headerAuthorizationInterceptor } from '@/interceptors/headerAuthorization.interceptor'

export const BASE_VIDEO_API_URL = environment.BASE_API_URL + '/videos'

export const videoEndpoint = axios.create({
  baseURL: BASE_VIDEO_API_URL
})

export const protectedVideoEndpoint = axios.create({
  baseURL: BASE_VIDEO_API_URL
})

protectedVideoEndpoint.interceptors.request.use(headerAuthorizationInterceptor)

export * from './endpoints'
