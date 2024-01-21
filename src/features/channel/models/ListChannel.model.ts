import {
  ChannelHandle,
  ChannelId,
  ChannelName,
  ChannelPictureUrl,
  ChannelSubscribers
} from '@/features/channel/types'

export interface ListChannel {
  id: ChannelId
  name: ChannelName
  handle: ChannelHandle
  picture_url: ChannelPictureUrl
  subscribers: ChannelSubscribers
}

export interface ListChannelAdapter {
  id: ChannelId
  name: ChannelName
  handle: ChannelHandle
  pictureUrl: ChannelPictureUrl
  subscribers: ChannelSubscribers
}
