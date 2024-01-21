import { ListChannel, ListChannelAdapter } from '@/features/channel/models'

export const listChannelAdapter = (
  channel: ListChannel
): ListChannelAdapter => ({
  handle: channel.handle,
  id: channel.id,
  name: channel.name,
  pictureUrl: channel.picture_url,
  subscribers: channel.subscribers
})
