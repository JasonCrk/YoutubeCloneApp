import { AuthTokens, SignUpResponse } from '@/features/auth/models'

export const signInMockResponse: AuthTokens = {
  access: 'accessJwt',
  refresh: 'refreshJwt'
}

export const signUpMockResponse: SignUpResponse = {
  re_password: 'testPassword',
  email: 'test@test.com',
  first_name: 'testFirstName',
  id: 1,
  last_name: 'testLastName',
  username: 'testUsername'
}
