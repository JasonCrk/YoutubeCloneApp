import {
  signUpInputsOriginal,
  signUpResponseAdapter
} from '@features/auth/adapters'

import { authEndpoint } from '.'

import {
  SignInInputs,
  AuthTokens,
  SignUpResponse,
  SignUpResponseAdapter,
  SignUpInputsAdapter
} from '../models'

import type { ServiceFn } from '@services/types'

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
