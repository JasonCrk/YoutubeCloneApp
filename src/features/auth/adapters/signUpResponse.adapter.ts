import { SignUpResponse, SignUpResponseAdapter } from '@/features/auth/models'

export const signUpResponseAdapter = (
  signUpResponse: SignUpResponse
): SignUpResponseAdapter => ({
  confirmPassword: signUpResponse.re_password,
  email: signUpResponse.email,
  firstName: signUpResponse.first_name,
  id: signUpResponse.id,
  lastName: signUpResponse.last_name,
  username: signUpResponse.username
})
