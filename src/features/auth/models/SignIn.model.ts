import { UserEmail, UserPassword } from '@/features/user/types'

export interface SignInInputs {
  email: UserEmail
  password: UserPassword
}
