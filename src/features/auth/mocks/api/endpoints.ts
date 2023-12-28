import { HttpResponse, http } from 'msw'

import { SignInInputs, SignUpInputs } from '@/features/auth/models'
import { BASE_AUTH_API_URL } from '@/features/auth/services'

import {
  signInMockResponse,
  signUpMockResponse
} from '@/features/auth/mocks/api/responses'
import {
  mockSignUpUserData,
  mockUserCredentials
} from '@/features/auth/mocks/api/requests'

export const signInMockEndpoint = http.post(
  BASE_AUTH_API_URL + '/jwt/create',
  async ({ request }) => {
    const credentials = (await request.json()) as SignInInputs

    if (
      credentials.email !== mockUserCredentials.email &&
      credentials.password !== mockUserCredentials.password
    ) {
      return HttpResponse.error()
    }

    return HttpResponse.json(signInMockResponse)
  }
)

export const signUpMockEndpoint = http.post(
  BASE_AUTH_API_URL + '/users',
  async ({ request }) => {
    const userData = (await request.json()) as SignUpInputs

    if (
      userData.email !== mockSignUpUserData.email &&
      userData.password !== mockSignUpUserData.password &&
      userData.username !== mockSignUpUserData.username &&
      userData.re_password !== mockSignUpUserData.confirmPassword &&
      userData.first_name !== mockSignUpUserData.firstName &&
      userData.last_name !== mockSignUpUserData.lastName
    ) {
      return HttpResponse.error()
    }

    return HttpResponse.json(signUpMockResponse)
  }
)
