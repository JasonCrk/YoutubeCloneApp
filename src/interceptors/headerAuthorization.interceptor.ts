import { InternalAxiosRequestConfig } from 'axios'

import { store } from '@/store/index'

export const headerAuthorizationInterceptor: (
  value: InternalAxiosRequestConfig
) => InternalAxiosRequestConfig = config => {
  if (!config.headers.Authorization) {
    const accessToken = store.getState().auth.accessToken
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
}
