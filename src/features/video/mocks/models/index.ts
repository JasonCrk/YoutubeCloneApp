import type {
  SimpleVideoItemAdapter,
  VideoDetailsAdapter
} from '@/features/video/models'

import {
  channelWithSubscribedAdapterMock,
  simpleChannelAdapterMock
} from '@/features/channel/mocks/models'

export const simpleVideoItemAdapterMock: SimpleVideoItemAdapter = {
  channel: simpleChannelAdapterMock,
  id: 1,
  publicationDate: new Date(),
  thumbnailUrl: 'http://images.com/test_thumnail.png',
  title: 'title',
  views: 10
}

export const videoDetailsAdapterMock: VideoDetailsAdapter = {
  channel: channelWithSubscribedAdapterMock,
  description: 'test description',
  id: 1,
  isDislike: false,
  isLike: false,
  publicationDate: new Date(),
  title: 'test title',
  totalComments: 1,
  totalDislikes: 1,
  totalLikes: 1,
  totalViews: 1,
  videoUrl: 'http://videos.com/test_video.mp4'
}
