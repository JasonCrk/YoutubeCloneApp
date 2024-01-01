import axios from 'axios'

import environment from '@/config/environment'

import { headerAuthorizationInterceptor } from '@/interceptors/headerAuthorization.interceptor'

export const BASE_PLAYLIST_API_URL = environment.BASE_API_URL + '/playlists'

export const playlistEndpoint = axios.create({
  baseURL: BASE_PLAYLIST_API_URL
})

playlistEndpoint.interceptors.request.use(headerAuthorizationInterceptor)

export * from './endpoints'
