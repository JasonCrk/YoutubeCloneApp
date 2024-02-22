import type {
  ChannelDetails,
  ChannelDetailsAdapter
} from '@/features/channel/models'

export const channelDetailsAdapter = (
  channel: ChannelDetails
): ChannelDetailsAdapter => ({
  bannerUrl: channel.banner_url,
  description: channel.description,
  handle: channel.handle,
  id: channel.id,
  isSubscribed: channel.subscribed,
  joined: channel.joined,
  links: channel.links,
  name: channel.name,
  pictureUrl: channel.picture_url,
  totalSubscribers: channel.subscribers,
  totalVideos: channel.total_videos,
  totalViews: channel.total_views
})
