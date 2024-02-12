import type { Id } from '@/models/types'

export type VideoId = Id
export type VideoTitle = string
export type VideoUrl = string
export type VideoThumbnail = string
export type VideoDescription = string
export type VideoPublicationDate = string
export type VideoViews = number
export type VideoLikes = number
export type VideoDislikes = number
export type VideoComments = number

export * from './WatchVideoLoaderData'
