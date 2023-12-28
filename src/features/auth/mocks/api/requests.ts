import { SignInInputs, SignUpInputsAdapter } from '@/features/auth/models'

export const mockUserCredentials: SignInInputs = {
  email: 'testUser@test.com',
  password: 'testUserPassword'
}

export const mockSignUpUserData: SignUpInputsAdapter = {
  email: 'testUser@test.com',
  password: 'testPassword',
  confirmPassword: 'testPassword',
  username: 'testUsername',
  firstName: 'testFirstName',
  lastName: 'testLastName'
}
