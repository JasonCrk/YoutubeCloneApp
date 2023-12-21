import * as z from 'zod'

export const signInValidator = z.object({
  email: z
    .string({ required_error: 'Email is required' })
    .email({ message: 'The email is invalid' })
    .min(5, 'Minium 5 characters'),
  password: z
    .string({ required_error: 'Password is required' })
    .min(1, 'Password is required')
})
