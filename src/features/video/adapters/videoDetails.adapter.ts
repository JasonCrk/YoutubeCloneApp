import type { VideoDetails, VideoDetailsAdapter } from '@/features/video/models'

import { channelWithSubscribedAdapter } from '@/features/channel/adapters'

export const videoDetailsAdapter = (
  video: VideoDetails
): VideoDetailsAdapter => ({
  id: video.id,
  channel: channelWithSubscribedAdapter(video.channel),
  description: video.description,
  isDislike: video.disliked,
  isLike: video.liked,
  publicationDate: new Date(video.publication_date),
  title: video.title,
  totalComments: video.comments,
  totalDislikes: video.dislikes,
  totalLikes: video.likes,
  totalViews: video.views,
  videoUrl: video.video_url
})
