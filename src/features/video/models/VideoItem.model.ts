import {
  VideoDescription,
  VideoId,
  VideoLikes,
  VideoPublicationDate,
  VideoThumbnail,
  VideoTitle,
  VideoViews
} from '../types'

import { SimpleChannelAdapter, SimpleChannel } from '@/features/channel/models'

export interface VideoItem {
  id: VideoId
  title: VideoTitle
  thumbnail: VideoThumbnail
  description: VideoDescription
  channel: SimpleChannel
  publication_date: VideoPublicationDate
  views: VideoViews
  likes: VideoLikes
}

export interface VideoItemAdapter {
  id: VideoId
  title: VideoTitle
  thumbnailUrl: VideoThumbnail
  description: VideoDescription
  channel: SimpleChannelAdapter
  publicationDate: VideoPublicationDate
  views: VideoViews
  likes: VideoLikes
}
