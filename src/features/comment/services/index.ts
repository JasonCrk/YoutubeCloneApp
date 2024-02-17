import axios, { CreateAxiosDefaults } from 'axios'

import { headerAuthorizationInterceptor } from '@/interceptors/headerAuthorization.interceptor'
import { verifyHeaderAuthorizationInterceptor } from '@/interceptors/verifyHeaderAuthorization.interceptor'

import environment from '@/config/environment'

export const BASE_COMMENT_API_URL = environment.BASE_API_URL + '/comments'

const commentEndpointDefaultOptions: CreateAxiosDefaults = {
  baseURL: BASE_COMMENT_API_URL
}

export const commentEndpoint = axios.create(commentEndpointDefaultOptions)

export const protectedCommentEndpoint = axios.create(
  commentEndpointDefaultOptions
)

export const optionalAuthCommentEndpoint = axios.create(
  commentEndpointDefaultOptions
)

protectedCommentEndpoint.interceptors.request.use(
  headerAuthorizationInterceptor
)

optionalAuthCommentEndpoint.interceptors.request.use(
  verifyHeaderAuthorizationInterceptor
)

export * from './endpoints'
