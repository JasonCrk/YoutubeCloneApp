import {
  ChannelHandle,
  ChannelId,
  ChannelName,
  ChannelPictureUrl
} from '@/features/channel/types'

export interface CurrentChannel {
  id: ChannelId
  picture_url: ChannelPictureUrl
  name: ChannelName
  handle: ChannelHandle
}

export interface CurrentChannelAdapter {
  id: ChannelId
  pictureUrl: ChannelPictureUrl
  name: ChannelName
  handle: ChannelHandle
}
