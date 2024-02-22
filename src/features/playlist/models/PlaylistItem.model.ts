import type { Visibility } from '@/models/types'

import type {
  PlaylistId,
  PlaylistName,
  PlaylistNumberVideos,
  PlaylistThumbnail,
  PlaylistUpdatedAt
} from '@/features/playlist/types'

import type { VideoId } from '@/features/video/types'

export interface PlaylistItem {
  id: PlaylistId
  name: PlaylistName
  thumbnail: PlaylistThumbnail
  first_video_id: VideoId
  number_videos: PlaylistNumberVideos
  visibility: Visibility
  updated_at: PlaylistUpdatedAt
}

export interface PlaylistItemAdapter {
  id: PlaylistId
  name: PlaylistName
  thumbnailUrl: PlaylistThumbnail
  firstVideoId: VideoId
  totalVideos: PlaylistNumberVideos
  visibility: Visibility
  updatedAt: Date
}
