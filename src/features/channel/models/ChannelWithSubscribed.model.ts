import type {
  ChannelHandle,
  ChannelId,
  ChannelName,
  ChannelPictureUrl,
  ChannelSubscribers
} from '@/features/channel/types'

export interface ChannelWithSubscribed {
  id: ChannelId
  name: ChannelName
  handle: ChannelHandle
  picture_url: ChannelPictureUrl
  subscribers: ChannelSubscribers
  subscribed: boolean
}

export interface ChannelWithSubscribedAdapter {
  id: ChannelId
  name: ChannelName
  handle: ChannelHandle
  pictureUrl: ChannelPictureUrl
  subscribers: ChannelSubscribers
  subscribed: boolean
}
