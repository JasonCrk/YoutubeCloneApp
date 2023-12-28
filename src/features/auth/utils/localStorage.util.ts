import { JwtToken } from '@/features/auth/types'

export const getAccessTokenFromLocalStorage = () => {
  return window.localStorage.getItem('accessToken')
}

export const setAccessTokenInLocalStorage = (accessToken: JwtToken) => {
  window.localStorage.setItem('accessToken', accessToken)
}

export const getRefreshTokenFromLocalStorage = () => {
  return window.localStorage.getItem('refreshToken')
}

export const setRefreshTokenInLocalStorage = (refreshToken: JwtToken) => {
  window.localStorage.setItem('refreshToken', refreshToken)
}
