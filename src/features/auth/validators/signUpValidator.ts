import * as z from 'zod'

export const signUpValidator = z
  .object({
    username: z
      .string({ invalid_type_error: 'The username must be a text' })
      .min(1, 'Username is required'),
    firstName: z
      .string({ invalid_type_error: 'The first name must be a text' })
      .min(1, 'First name is required'),
    lastName: z
      .string({ invalid_type_error: 'The last name must be a text' })
      .min(1, 'Last name is required'),
    email: z
      .string({ invalid_type_error: 'The email must be a text' })
      .email({ message: 'Email is invalid' })
      .min(1, 'Email is required'),
    password: z
      .string({ invalid_type_error: 'The password must be a text' })
      .min(1, 'Password is required'),
    confirmPassword: z
      .string({ invalid_type_error: 'The confirm password must be a text' })
      .min(1, 'Confirm password is required')
  })
  .refine(userData => userData.confirmPassword === userData.password, {
    message: 'Must be equal to the password',
    path: ['confirmPassword']
  })
