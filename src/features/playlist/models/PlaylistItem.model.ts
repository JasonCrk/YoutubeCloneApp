import type { Visibility } from '@/models/types'

import type {
  PlaylistId,
  PlaylistName,
  PlaylistNumberVideos,
  PlaylistUpdatedAt
} from '@/features/playlist/types'

import type { VideoId, VideoThumbnail } from '@/features/video/types'

export interface PlaylistItem {
  id: PlaylistId
  name: PlaylistName
  thumbnail: VideoThumbnail
  first_video_id: VideoId
  number_videos: PlaylistNumberVideos
  visibility: Visibility
  updated_at: PlaylistUpdatedAt
}

export interface PlaylistItemAdapter {
  id: PlaylistId
  name: PlaylistName
  thumbnailUrl: VideoThumbnail
  firstVideoId: VideoId
  totalVideos: PlaylistNumberVideos
  visibility: Visibility
  updatedAt: Date
}
