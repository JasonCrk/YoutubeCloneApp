import axios from 'axios'

import environment from '@/config/environment'

import { headerAuthorizationInterceptor } from '@/interceptors/headerAuthorization.interceptor'
import { verifyHeaderAuthorizationInterceptor } from '@/interceptors/verifyHeaderAuthorization.interceptor'

export const BASE_PLAYLIST_API_URL = environment.BASE_API_URL + '/playlists'

export const protectedPlaylistEndpoint = axios.create({
  baseURL: BASE_PLAYLIST_API_URL
})

export const optionalAuthPlaylistEndpoint = axios.create({
  baseURL: BASE_PLAYLIST_API_URL
})

export const playlistEndpoint = axios.create({
  baseURL: BASE_PLAYLIST_API_URL
})

protectedPlaylistEndpoint.interceptors.request.use(
  headerAuthorizationInterceptor
)

optionalAuthPlaylistEndpoint.interceptors.request.use(
  verifyHeaderAuthorizationInterceptor
)

export * from './endpoints'
