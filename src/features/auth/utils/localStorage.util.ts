import { JwtToken } from '@/features/auth/types'

import {
  ACCESS_TOKEN_LOCAL_STORAGE_KEY,
  REFRESH_TOKEN_LOCAL_STORAGE_KEY
} from '@/features/auth/constants/localStorage'

export const getAccessTokenFromLocalStorage = () => {
  return window.localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY)
}

export const setAccessTokenInLocalStorage = (accessToken: JwtToken) => {
  window.localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, accessToken)
}

export const removeAccessTokenFromLocalStorage = () => {
  window.localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY)
}

export const getRefreshTokenFromLocalStorage = () => {
  return window.localStorage.getItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY)
}

export const setRefreshTokenInLocalStorage = (refreshToken: JwtToken) => {
  window.localStorage.setItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY, refreshToken)
}

export const removeRefreshTokenFromLocalStorage = () => {
  window.localStorage.removeItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY)
}
