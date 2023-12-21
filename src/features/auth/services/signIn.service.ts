import { authEndpoint } from '.'

import { SignInInputs, AuthTokens } from '../models'

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
