import { SignUpInputs, SignUpInputsAdapter } from '@/features/auth/models'

export const signUpInputsAdapter = (
  signUpInputs: SignUpInputs
): SignUpInputsAdapter => ({
  confirmPassword: signUpInputs.re_password,
  email: signUpInputs.email,
  firstName: signUpInputs.first_name,
  lastName: signUpInputs.last_name,
  password: signUpInputs.password,
  username: signUpInputs.username
})

export const signUpInputsOriginal = (
  signUpInputs: SignUpInputsAdapter
): SignUpInputs => ({
  email: signUpInputs.email,
  first_name: signUpInputs.firstName,
  last_name: signUpInputs.lastName,
  password: signUpInputs.password,
  re_password: signUpInputs.confirmPassword,
  username: signUpInputs.username
})
