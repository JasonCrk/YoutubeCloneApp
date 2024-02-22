import type {
  PlaylistItem,
  PlaylistItemAdapter
} from '@/features/playlist/models'

export const playlistItemAdapter = (
  playlist: PlaylistItem
): PlaylistItemAdapter => ({
  firstVideoId: playlist.first_video_id,
  id: playlist.id,
  name: playlist.name,
  thumbnailUrl: playlist.thumbnail,
  totalVideos: playlist.number_videos,
  updatedAt: new Date(playlist.updated_at),
  visibility: playlist.visibility
})
