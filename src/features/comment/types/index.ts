import type { Id } from '@/models/types'

export type CommentId = Id
export type CommentContent = string
export type CommentPublicationDate = string
export type CommentWasEdited = boolean
export type CommentDislikes = number
export type CommentLikes = number

export * from './VideoCommentsParams'
