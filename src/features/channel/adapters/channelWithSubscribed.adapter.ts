import type {
  ChannelWithSubscribed,
  ChannelWithSubscribedAdapter
} from '@/features/channel/models'

export const channelWithSubscribedAdapter = (
  channel: ChannelWithSubscribed
): ChannelWithSubscribedAdapter => ({
  handle: channel.handle,
  id: channel.id,
  name: channel.name,
  pictureUrl: channel.picture_url,
  subscribers: channel.subscribers,
  subscribed: channel.subscribed
})
