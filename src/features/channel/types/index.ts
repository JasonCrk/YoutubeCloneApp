import type { Id } from '@/models/types'

export type ChannelId = Id
export type ChannelBannerUrl = string | null
export type ChannelPictureUrl = string | null
export type ChannelDescription = string | null
export type ChannelJoined = string
export type ChannelName = string
export type ChannelHandle = string
export type ChannelContactEmail = string
export type ChannelSubscribers = number
export type ChannelTotalViews = number
export type ChannelTotalVideos = number

export * from './optionsMenu'
