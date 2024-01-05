import {
  VideoId,
  VideoPublicationDate,
  VideoThumbnail,
  VideoTitle,
  VideoViews
} from '../types'

import {
  SimpleChannelAdapter,
  SimpleChannel
} from '@/features/channel/models/SimpleChannel.model'

export interface SimpleVideoItem {
  id: VideoId
  title: VideoTitle
  thumbnail: VideoThumbnail
  channel: SimpleChannel
  publication_date: VideoPublicationDate
  views: VideoViews
}

export interface SimpleVideoItemAdapter {
  id: VideoId
  title: VideoTitle
  thumbnailUrl: VideoThumbnail
  channel: SimpleChannelAdapter
  publicationDate: Date
  views: VideoViews
}
