import axios from 'axios'

import environment from '@config/environment'

export const BASE_AUTH_API_URL = environment.BASE_API_URL + '/auth'

export const authEndpoint = axios.create({
  baseURL: BASE_AUTH_API_URL
})

export * from './endpoints'
