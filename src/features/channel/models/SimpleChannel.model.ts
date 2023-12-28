import { ChannelId, ChannelName, ChannelPictureUrl } from '../types'

export interface SimpleChannel {
  id: ChannelId
  picture_url: ChannelPictureUrl
  name: ChannelName
}

export interface SimpleChannelAdapter {
  id: ChannelId
  pictureUrl: ChannelPictureUrl
  name: ChannelName
}
