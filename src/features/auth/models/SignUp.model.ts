import {
  UserEmail,
  UserFirstName,
  UserId,
  UserLastName,
  UserPassword,
  UserUsername
} from '@/features/user/types'

export interface SignUpInputs {
  username: UserUsername
  first_name: UserFirstName
  last_name: UserLastName
  email: UserEmail
  password: UserPassword
  re_password: UserPassword
}

export interface SignUpInputsAdapter {
  username: UserUsername
  firstName: UserFirstName
  lastName: UserLastName
  email: UserEmail
  password: UserPassword
  confirmPassword: UserPassword
}

export interface SignUpResponse {
  id: UserId
  username: UserUsername
  first_name: UserFirstName
  last_name: UserLastName
  email: UserEmail
  re_password: UserPassword
}

export interface SignUpResponseAdapter {
  id: UserId
  username: UserUsername
  firstName: UserFirstName
  lastName: UserLastName
  email: UserEmail
  confirmPassword: UserPassword
}
