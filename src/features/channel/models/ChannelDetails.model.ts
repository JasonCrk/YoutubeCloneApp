import type {
  ChannelBannerUrl,
  ChannelDescription,
  ChannelHandle,
  ChannelId,
  ChannelJoined,
  ChannelName,
  ChannelPictureUrl,
  ChannelSubscribers,
  ChannelTotalVideos,
  ChannelTotalViews
} from '@/features/channel/types'

import { LinkItem } from '@/features/links/models'

export interface ChannelDetails {
  id: ChannelId
  name: ChannelName
  handle: ChannelHandle
  description: ChannelDescription
  picture_url: ChannelPictureUrl
  banner_url: ChannelBannerUrl
  joined: ChannelJoined
  subscribers: ChannelSubscribers
  links: LinkItem[]
  total_videos: ChannelTotalVideos
  total_views: ChannelTotalViews
  subscribed: boolean
}

export interface ChannelDetailsAdapter {
  id: ChannelId
  name: ChannelName
  handle: ChannelHandle
  description: ChannelDescription
  pictureUrl: ChannelPictureUrl
  bannerUrl: ChannelBannerUrl
  joined: ChannelJoined
  totalSubscribers: ChannelSubscribers
  links: LinkItem[]
  totalVideos: ChannelTotalVideos
  totalViews: ChannelTotalViews
  isSubscribed: boolean
}
