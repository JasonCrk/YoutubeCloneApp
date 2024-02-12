import type {
  VideoComments,
  VideoDescription,
  VideoDislikes,
  VideoId,
  VideoLikes,
  VideoPublicationDate,
  VideoTitle,
  VideoUrl,
  VideoViews
} from '@/features/video/types'

import type {
  ChannelWithSubscribed,
  ChannelWithSubscribedAdapter
} from '@/features/channel/models'

export interface VideoDetails {
  id: VideoId
  title: VideoTitle
  video_url: VideoUrl
  description: VideoDescription
  channel: ChannelWithSubscribed
  publication_date: VideoPublicationDate
  views: VideoViews
  comments: VideoComments
  likes: VideoLikes
  dislikes: VideoDislikes
  liked: boolean
  disliked: boolean
}

export interface VideoDetailsAdapter {
  id: VideoId
  title: VideoTitle
  videoUrl: VideoUrl
  description: VideoDescription
  channel: ChannelWithSubscribedAdapter
  publicationDate: Date
  totalViews: VideoViews
  totalComments: VideoComments
  totalLikes: VideoLikes
  totalDislikes: VideoDislikes
  isLike: boolean
  isDislike: boolean
}
