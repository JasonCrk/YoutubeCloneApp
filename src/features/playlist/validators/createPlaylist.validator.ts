import { z } from 'zod'

import { Visibility } from '@/models/types'

export const createPlaylistValidator = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Must be a text'
    })
    .min(1, 'Name is required')
    .max(150, 'Maximum 150 characters')
    .trim(),
  visibility: z
    .nativeEnum(Visibility, {
      required_error: 'Privacy is required',
      invalid_type_error: 'Must be a text'
    })
    .default(Visibility.PRIVATE)
})
