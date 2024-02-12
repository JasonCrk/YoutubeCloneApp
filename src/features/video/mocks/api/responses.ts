import { channelWithSubscribedMock } from '@/features/channel/mocks/models'
import type { VideoDetails } from '@/features/video/models'
import type { MessageResponse } from '@/models/responses'

export const createVideoMockResponse: MessageResponse = {
  message: 'test message'
}

export const retrieveVideoDetailsMockResponse: VideoDetails = {
  channel: channelWithSubscribedMock,
  comments: 1,
  description: 'test description',
  disliked: false,
  dislikes: 1,
  id: 1,
  liked: false,
  likes: 1,
  publication_date: new Date().toISOString(),
  title: 'test title',
  video_url: 'https://videos.com/test_video.mp4',
  views: 10
}
