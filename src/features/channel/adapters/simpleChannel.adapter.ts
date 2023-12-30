import { SimpleChannelAdapter, SimpleChannel } from '@/features/channel/models'

export const simpleChannelAdapter = (
  channel: SimpleChannel
): SimpleChannelAdapter => {
  return {
    id: channel.id,
    handle: channel.handle,
    name: channel.name,
    pictureUrl: channel.picture_url
  }
}
