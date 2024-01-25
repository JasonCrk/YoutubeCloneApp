import { z } from 'zod'

export const createChannelValidator = z.object({
  name: z
    .string({
      invalid_type_error: 'The name must be a text',
      required_error: 'The name is required'
    })
    .min(1, 'The name is required')
})
