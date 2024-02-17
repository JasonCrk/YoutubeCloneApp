import { z } from 'zod'

export const createCommentValidator = z.object({
  content: z
    .string({
      required_error: 'Is required',
      invalid_type_error: 'Must be a text'
    })
    .min(1, 'Is required')
    .max(250, 'Maximum 255 characters')
})
