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

import type { ServiceFn } from '@/services/types'

export const signInService: ServiceFn<
  AuthTokens,
  SignInInputs
> = async signInData => {
  const response = await authEndpoint.post<AuthTokens>(
    '/jwt/create',
    signInData
  )
  return response.data
}

export const signUpService: ServiceFn<
  SignUpResponse,
  SignUpInputsAdapter
> = async signUpData => {
  const userDataOriginal = signUpInputsOriginal(signUpData!)
  const response = await authEndpoint.post<SignUpResponse>(
    '/users/',
    userDataOriginal
  )
  return response.data
}

export const verifyTokenService: ServiceFn<
  void,
  JwtToken | null
> = async token => {
  await authEndpoint.post<void>('/jwt/verify/', { token })
}

export const refreshTokensService: ServiceFn<
  Pick<AuthTokens, 'access'>,
  JwtToken | null
> = async refresh => {
  const response = await authEndpoint.post<Pick<AuthTokens, 'access'>>(
    '/jwt/refresh/',
    { refresh }
  )
  return response.data
}

export const retrieveUserWithAccessTokenService: ServiceFn<
  AuthenticatedUser,
  JwtToken | null
> = async token => {
  const response = await authEndpoint.get<AuthenticatedUser>('/users/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return response.data
}
