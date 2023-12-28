import {
  signUpInputsOriginal,
  signUpResponseAdapter
} from '@features/auth/adapters'

import {
  SignInInputs,
  AuthTokens,
  SignUpResponse,
  SignUpResponseAdapter,
  SignUpInputsAdapter
} from '@features/auth/models'
import { authEndpoint } from '@features/auth/services'
import type { JwtToken } from '@features/auth/types'

import type { ServiceFnWithParams } from '@services/types'

export const signInService: ServiceFnWithParams<
  AuthTokens,
  SignInInputs
> = async signInData => {
  const response = await authEndpoint.post<AuthTokens>(
    '/jwt/create',
    signInData
  )
  return response.data
}

export const signUpService: ServiceFnWithParams<
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
