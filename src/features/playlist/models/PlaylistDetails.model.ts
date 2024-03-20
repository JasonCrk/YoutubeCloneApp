import { Visibility } from '@/models/types'

import type {
  PlaylistCreatedAt,
  PlaylistDescription,
  PlaylistId,
  PlaylistName,
  PlaylistNumberVideos,
  PlaylistUpdatedAt
} from '@/features/playlist/types'

import type {
  SimpleChannel,
  SimpleChannelAdapter
} from '@/features/channel/models'

import type { VideoId, VideoThumbnail } from '@/features/video/types'

export interface PlaylistDetails {
  id: PlaylistId
  name: PlaylistName
  first_video_id: VideoId | null
  thumbnail: VideoThumbnail | null
  channel: SimpleChannel
  description: PlaylistDescription
  visibility: Visibility
  total_videos: PlaylistNumberVideos
  created_at: PlaylistCreatedAt
  updated_at: PlaylistUpdatedAt
}

export interface PlaylistDetailsAdapter {
  id: PlaylistId
  name: PlaylistName
  firstVideoId: VideoId | null
  thumbnail: VideoThumbnail | null
  channel: SimpleChannelAdapter
  description: PlaylistDescription
  visibility: Visibility
  totalVideos: PlaylistNumberVideos
  createdAt: Date
  updatedAt: Date
}
