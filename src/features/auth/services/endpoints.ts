import { signUpInputsOriginal } from '@/features/auth/adapters'

import {
  SignInInputs,
  AuthTokens,
  SignUpResponse,
  SignUpInputsAdapter,
  AuthenticatedUser
} from '@/features/auth/models'
import { authEndpoint } from '@/features/auth/services'
import type { JwtToken } from '@/features/auth/types'

export const signInService = async (
  signInData: SignInInputs
): Promise<AuthTokens> => {
  const response = await authEndpoint.post<AuthTokens>(
    '/jwt/create',
    signInData
  )
  return response.data
}

export const signUpService = async (
  signUpData: SignUpInputsAdapter
): Promise<SignUpResponse> => {
  const userDataOriginal = signUpInputsOriginal(signUpData!)
  const response = await authEndpoint.post<SignUpResponse>(
    '/users/',
    userDataOriginal
  )
  return response.data
}

export const verifyTokenService = async (
  token: JwtToken | null
): Promise<void> => {
  await authEndpoint.post<void>('/jwt/verify/', { token })
}

export const refreshTokensService = async (
  refresh: JwtToken | null
): Promise<Pick<AuthTokens, 'access'>> => {
  const response = await authEndpoint.post<Pick<AuthTokens, 'access'>>(
    '/jwt/refresh/',
    { refresh }
  )
  return response.data
}

export const retrieveUserWithAccessTokenService = async (
  token: JwtToken | null
): Promise<AuthenticatedUser> => {
  const response = await authEndpoint.get<AuthenticatedUser>('/users/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data
}
