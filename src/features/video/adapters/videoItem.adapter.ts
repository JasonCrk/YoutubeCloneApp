import type { VideoItemAdapter, VideoItem } from '@/features/video/models'

import { simpleChannelAdapter } from '@/features/channel/adapters/simpleChannel.adapter'

export const videoItemAdapter = (video: VideoItem): VideoItemAdapter => ({
  id: video.id,
  title: video.title,
  channel: simpleChannelAdapter(video.channel),
  thumbnailUrl: video.thumbnail,
  description: video.description,
  likes: video.likes,
  views: video.views,
  publicationDate: video.publication_date
})
