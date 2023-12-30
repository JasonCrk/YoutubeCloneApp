import {
  ChannelHandle,
  ChannelId,
  ChannelName,
  ChannelPictureUrl
} from '../types'

export interface SimpleChannel {
  id: ChannelId
  handle: ChannelHandle
  picture_url: ChannelPictureUrl
  name: ChannelName
}

export interface SimpleChannelAdapter {
  id: ChannelId
  handle: ChannelHandle
  pictureUrl: ChannelPictureUrl
  name: ChannelName
}
