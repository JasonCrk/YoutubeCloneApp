import { custom } from 'zod'

export const isMp4VideoValidator = custom<File>(file => file instanceof File, {
  message: 'The video is invalid'
}).refine(file => file.type === 'video/mp4', {
  message: 'The video must be in MP4 format'
})

export const isImageValidator = custom<File>(file => file instanceof File, {
  message: 'The image is invalid'
}).refine(image => !/^image\/(?=jpeg|png|webp)$/i.test(image.type), {
  message: 'The image must be only one of these types: .png, .jpeg, or .webp'
})
