import { HttpResponse, http } from 'msw'

import { SignInInputs } from '@features/auth/models'
import { BASE_AUTH_API_URL } from '@features/auth/services'
import { signInMockResponse } from '@features/auth/mocks/api/responses'
import { mockUserCredentials } from '@features/auth/mocks/api/requests'

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
