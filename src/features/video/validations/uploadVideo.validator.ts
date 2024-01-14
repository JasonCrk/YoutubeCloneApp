import { z } from 'zod'

import { isImageValidator, isMp4VideoValidator } from '@/validations/index'

export const uploadVideoValidator = z.object({
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'The title must be a text'
    })
    .min(1, 'Title is required')
    .max(45, 'Maximum 45 characters'),
  description: z
    .string({
      invalid_type_error: 'The description must be a text'
    })
    .max(255, 'Maximum 255 characters')
    .nullable(),
  video: isMp4VideoValidator,
  thumbnail: isImageValidator
})
