import {
  SimpleVideoItem,
  SimpleVideoItemAdapter
} from '@/features/video/models'

import { simpleChannelAdapter } from '@/features/channel/adapters'

export const simpleVideoItemAdapter = (
  video: SimpleVideoItem
): SimpleVideoItemAdapter => ({
  channel: simpleChannelAdapter(video.channel),
  id: video.id,
  publicationDate: new Date(video.publication_date),
  thumbnailUrl: video.thumbnail,
  title: video.title,
  views: video.views
})
