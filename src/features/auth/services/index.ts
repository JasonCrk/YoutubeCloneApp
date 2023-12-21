import axios from 'axios'

import environment from '@config/environment'

export const authEndpoint = axios.create({
  baseURL: environment.BASE_API_URL + '/auth'
})

export * from './signIn.service'
