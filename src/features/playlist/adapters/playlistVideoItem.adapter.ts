import type {
  PlaylistVideoItem,
  PlaylistVideoItemAdapter
} from '@/features/playlist/models'
import { simpleVideoItemAdapter } from '@/features/video/adapters'

export const playlistVideoItemAdapter = (
  playlistVideo: PlaylistVideoItem
): PlaylistVideoItemAdapter => ({
  id: playlistVideo.id,
  position: playlistVideo.position,
  video: simpleVideoItemAdapter(playlistVideo.video)
})
