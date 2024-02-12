import type { InternalAxiosRequestConfig } from 'axios'

import { store } from '@/store'

export const verifyHeaderAuthorizationInterceptor: (
  value: InternalAxiosRequestConfig
) => InternalAxiosRequestConfig = config => {
  const accessToken = store.getState().auth.accessToken

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  } else {
    config.headers.Authorization = undefined
  }

  return config
}
