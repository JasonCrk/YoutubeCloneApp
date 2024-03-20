import type {
  PlaylistDetails,
  PlaylistDetailsAdapter
} from '@/features/playlist/models'

import { simpleChannelAdapter } from '@/features/channel/adapters'

export const playlistDetailsAdapter = (
  playlist: PlaylistDetails
): PlaylistDetailsAdapter => ({
  id: playlist.id,
  name: playlist.name,
  description: playlist.description,
  visibility: playlist.visibility,
  channel: simpleChannelAdapter(playlist.channel),
  firstVideoId: playlist.first_video_id,
  thumbnail: playlist.thumbnail,
  totalVideos: playlist.total_videos,
  updatedAt: new Date(playlist.updated_at),
  createdAt: new Date(playlist.created_at)
})
