import axios, { CreateAxiosDefaults } from 'axios'

import { headerAuthorizationInterceptor } from '@/interceptors/headerAuthorization.interceptor'

import environment from '@/config/environment'

export const BASE_CHANNEL_API_URL = environment.BASE_API_URL + '/channels'

const channelEndpointOptions: CreateAxiosDefaults = {
  baseURL: BASE_CHANNEL_API_URL
}

export const channelEndpoint = axios.create(channelEndpointOptions)

export const protectedChannelEndpoint = axios.create(channelEndpointOptions)

protectedChannelEndpoint.interceptors.request.use(
  headerAuthorizationInterceptor
)
