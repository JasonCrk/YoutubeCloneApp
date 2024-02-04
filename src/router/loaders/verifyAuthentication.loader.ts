import { QueryClient } from '@tanstack/react-query'

import { store } from '@/store'
import { logout, setAuthTokens, setUser } from '@/store/slices/authSlice'

import {
  refreshTokensService,
  retrieveUserWithAccessTokenService,
  verifyTokenService
} from '@/features/auth/services'
import { authenticatedUserAdapter } from '@/features/auth/adapters'
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

export const verifyAuthentication = (queryClient: QueryClient) => {
  return async () => {
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
        const { access: newAccessToken } = await queryClient.fetchQuery({
          queryKey: ['refreshAccessToken', validAccessToken],
          queryFn: () => refreshTokensService(validAccessToken)
        })

        validAccessToken = newAccessToken
      } catch (e) {
        return rejectAuthentication()
      }
    }

    try {
      const authenticatedUser = await queryClient.fetchQuery({
        queryKey: ['userAuth', validAccessToken],
        queryFn: async () => {
          const userData =
            await retrieveUserWithAccessTokenService(validAccessToken)
          return authenticatedUserAdapter(userData)
        }
      })

      dispatch(setUser(authenticatedUser))
      dispatch(setAuthTokens({ accessToken: validAccessToken, refreshToken }))
    } catch (e) {
      return rejectAuthentication()
    }

    return null
  }
}
