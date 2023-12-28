import {
  signUpInputsOriginal,
  signUpResponseAdapter
} from '@/features/auth/adapters'

import {
  SignInInputs,
  AuthTokens,
  SignUpResponse,
  SignUpResponseAdapter,
  SignUpInputsAdapter
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
  SignUpResponseAdapter,
  SignUpInputsAdapter
> = async signUpData => {
  const userDataOriginal = signUpInputsOriginal(signUpData!)
  const response = await authEndpoint.post<SignUpResponse>(
    '/users/',
    userDataOriginal
  )
  return signUpResponseAdapter(response.data)
}

export const verifyTokenService: ServiceFn<
  void,
  JwtToken
> = async accessToken => {
  await authEndpoint.post<void>('/jwt/verify/', undefined, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  })
}
