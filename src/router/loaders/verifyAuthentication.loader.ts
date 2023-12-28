import { LoaderFunction } from 'react-router-dom'

import { store } from '@/store/index'
import { logout, setAuthTokens, setUser } from '@/store/slices/authSlice'

import {
  refreshTokensService,
  retrieveUserWithAccessToken,
  verifyTokenService
} from '@/features/auth/services'
import {
  removeAccessTokenFromLocalStorage,
  removeRefreshTokenFromLocalStorage
} from '@/features/auth/utils'

const rejectAuthentication = () => {
  const dispatch = store.dispatch

  dispatch(logout())

  removeAccessTokenFromLocalStorage()
  removeRefreshTokenFromLocalStorage()

  return null
}

export const verifyAuthentication: LoaderFunction = async () => {
  const { accessToken, isAuth, refreshToken } = store.getState().auth
  const dispatch = store.dispatch

  if (!isAuth && !accessToken) {
    dispatch(logout())
    return null
  }

  let validAccessToken = accessToken

  try {
    await verifyTokenService(validAccessToken)
  } catch (e) {
    if (!refreshToken) return rejectAuthentication()

    try {
      const { access } = await refreshTokensService(refreshToken)
      validAccessToken = access
    } catch (e) {
      return rejectAuthentication()
    }
  }

  try {
    const user = await retrieveUserWithAccessToken(validAccessToken)

    dispatch(setUser(user))
    dispatch(setAuthTokens({ accessToken: validAccessToken, refreshToken }))
  } catch (e) {
    return rejectAuthentication()
  }

  return null
}
